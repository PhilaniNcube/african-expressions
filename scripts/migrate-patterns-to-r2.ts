/**
 * Migration script: for every pattern in Neon, download the image and
 * document from their Supabase storage URLs, convert the image to WebP
 * (compressed), upload both files to Cloudflare R2, then update the
 * `image` and `document` columns in Neon with the new R2 public URLs.
 *
 * Run with:
 *   npx tsx scripts/migrate-patterns-to-r2.ts
 *
 * The script is idempotent – rows whose URLs already point at R2 are skipped.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createRequire } from 'node:module';
import type { Sharp, SharpOptions } from 'sharp';
const _require = createRequire(import.meta.url);
const sharp = _require('sharp') as (
  input?: Buffer | string,
  options?: SharpOptions,
) => Sharp;

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import * as schema from '../db/schema';

// ─── Clients ──────────────────────────────────────────────────────────────────

const neonSql = neon(process.env.DATABASE_URL!);
const db = drizzle(neonSql, { schema });

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET = process.env.R2_SECRET!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = (
  process.env.R2_PUBLIC_DEV_URL ?? process.env.R2_PUBLIC_PROD_URL ?? ''
).replace(/\/$/, ''); // strip trailing slash

import { S3Client } from '@aws-sdk/client-s3';
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Download raw bytes from any public URL */
async function fetchBytes(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Convert an image buffer to WebP.
 * - quality 75 → good visual quality at roughly 30-50 % of the original size
 * - effort 4   → reasonable encoding speed / compression trade-off
 */
async function toWebP(inputBuffer: Buffer): Promise<Buffer> {
  return sharp(inputBuffer)
    .webp({ quality: 75, effort: 4 })
    .toBuffer();
}

/** Upload bytes to R2 and return the public URL for the stored key. */
async function uploadToR2(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return `${R2_PUBLIC_URL}/${key}`;
}

/**
 * Derive a file extension from a URL path (e.g. "document.pdf" → "pdf").
 * Falls back to "bin" if nothing can be determined.
 */
function extFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const parts = pathname.split('.');
    if (parts.length > 1) return parts[parts.length - 1].toLowerCase().split('?')[0];
  } catch {
    // ignore
  }
  return 'bin';
}

/**
 * Guess the MIME type for a document file extension.
 */
function mimeForExt(ext: string): string {
  const map: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
  };
  return map[ext] ?? 'application/octet-stream';
}

/** Returns true when the URL already points at our R2 bucket. */
function isR2Url(url: string): boolean {
  return url.startsWith(R2_PUBLIC_URL) || url.includes('r2.cloudflarestorage.com');
}

// ─── Main migration ───────────────────────────────────────────────────────────

async function migratePatternFiles() {
  console.log('Fetching patterns from Neon…');
  const rows = await db.select().from(schema.patterns);
  console.log(`  Found ${rows.length} pattern(s)\n`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const pattern of rows) {
    const { id, name, image: imageUrl, document: documentUrl } = pattern;

    const imageAlreadyMigrated = isR2Url(imageUrl);
    const documentAlreadyMigrated = isR2Url(documentUrl);

    if (imageAlreadyMigrated && documentAlreadyMigrated) {
      console.log(`[SKIP] ${name} (${id}) – already on R2`);
      skipped++;
      continue;
    }

    console.log(`[MIGRATE] ${name} (${id})`);

    let newImageUrl = imageUrl;
    let newDocumentUrl = documentUrl;

    // ── Image ────────────────────────────────────────────────────────────────
    if (!imageAlreadyMigrated) {
      try {
        console.log(`  ↓ Downloading image: ${imageUrl}`);
        const raw = await fetchBytes(imageUrl);

        console.log(`  ⚙ Converting to WebP (original size: ${(raw.length / 1024).toFixed(1)} KB)…`);
        const webp = await toWebP(raw);
        console.log(`  ✓ WebP size: ${(webp.length / 1024).toFixed(1)} KB`);

        const key = `patterns/${id}/image.webp`;
        newImageUrl = await uploadToR2(key, webp, 'image/webp');
        console.log(`  ↑ Uploaded image → ${newImageUrl}`);
      } catch (err) {
        console.error(`  ✗ Image failed: ${(err as Error).message}`);
        failed++;
        continue;
      }
    } else {
      console.log('  ✓ Image already on R2, skipping');
    }

    // ── Document ─────────────────────────────────────────────────────────────
    if (!documentAlreadyMigrated) {
      try {
        console.log(`  ↓ Downloading document: ${documentUrl}`);
        const docBytes = await fetchBytes(documentUrl);
        const ext = extFromUrl(documentUrl);
        const mime = mimeForExt(ext);

        const key = `patterns/${id}/document.${ext}`;
        newDocumentUrl = await uploadToR2(key, docBytes, mime);
        console.log(`  ↑ Uploaded document (${(docBytes.length / 1024).toFixed(1)} KB) → ${newDocumentUrl}`);
      } catch (err) {
        console.error(`  ✗ Document failed: ${(err as Error).message}`);
        failed++;
        continue;
      }
    } else {
      console.log('  ✓ Document already on R2, skipping');
    }

    // ── Update Neon ──────────────────────────────────────────────────────────
    try {
      await db
        .update(schema.patterns)
        .set({ image: newImageUrl, document: newDocumentUrl })
        .where(eq(schema.patterns.id, id));
      console.log(`  ✓ Neon row updated\n`);
      migrated++;
    } catch (err) {
      console.error(`  ✗ DB update failed: ${(err as Error).message}\n`);
      failed++;
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('─'.repeat(50));
  console.log(`Done.`);
  console.log(`  Migrated : ${migrated}`);
  console.log(`  Skipped  : ${skipped}`);
  console.log(`  Failed   : ${failed}`);
}

migratePatternFiles().catch(err => {
  console.error(err);
  process.exit(1);
});
