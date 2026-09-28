/**
 * Migration script: for every product in Neon, download the main_image and
 * every entry in the images array from their Supabase storage URLs, convert
 * each image to WebP (compressed), upload to Cloudflare R2, then update the
 * `main_image` and `images` columns in Neon with the new R2 public URLs.
 *
 * Column conventions (current):
 *   main_image  – full URL  (e.g. https://<supabase>/storage/v1/object/public/…)
 *   images[]    – relative paths combined with NEXT_PUBLIC_IMAGE_URL:
 *                 full URL = `${NEXT_PUBLIC_IMAGE_URL}/${product.slug}/${entry}`
 *
 * After migration both columns will contain full R2 public URLs.
 *
 * Run with:
 *   npx tsx scripts/migrate-products-to-r2.ts
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
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as schema from '../db/schema';

// ─── Clients ──────────────────────────────────────────────────────────────────

const neonSql = neon(process.env.DATABASE_URL!);
const db = drizzle(neonSql, { schema });

// Base URL used to reconstruct full URLs for relative `images[]` entries
const SUPABASE_IMAGE_BASE = (
  process.env.NEXT_PUBLIC_IMAGE_URL ?? ''
).replace(/\/$/, '');

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET = process.env.R2_SECRET!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_PUBLIC_URL = (
  process.env.R2_PUBLIC_DEV_URL ?? process.env.R2_PUBLIC_PROD_URL ?? ''
).replace(/\/$/, '');

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchBytes(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function toWebP(inputBuffer: Buffer): Promise<Buffer> {
  return sharp(inputBuffer)
    .webp({ quality: 75, effort: 4 })
    .toBuffer();
}

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

function isR2Url(url: string): boolean {
  return url.startsWith(R2_PUBLIC_URL) || url.includes('r2.cloudflarestorage.com');
}

/**
 * Download, convert to WebP, upload to R2 and return the new public URL.
 * Returns null on failure (caller decides whether to abort the row).
 */
async function migrateImage(
  sourceUrl: string,
  r2Key: string,
  label: string,
): Promise<string | null> {
  try {
    process.stdout.write(`  ↓ [${label}] Downloading…`);
    const raw = await fetchBytes(sourceUrl);

    process.stdout.write(` (${(raw.length / 1024).toFixed(0)} KB) → WebP…`);
    const webp = await toWebP(raw);

    process.stdout.write(` (${(webp.length / 1024).toFixed(0)} KB) → R2…`);
    const publicUrl = await uploadToR2(r2Key, webp, 'image/webp');

    console.log(' ✓');
    return publicUrl;
  } catch (err) {
    console.log(` ✗ ${(err as Error).message}`);
    return null;
  }
}

// ─── Main migration ───────────────────────────────────────────────────────────

async function migrateProductImages() {
  console.log('Fetching products from Neon…');
  const rows = await db.select().from(schema.products);
  console.log(`  Found ${rows.length} product(s)\n`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const product of rows) {
    const { id, name, slug, main_image, images } = product;

    const mainAlreadyMigrated = isR2Url(main_image);
    const imagesAlreadyMigrated =
      images.length === 0 || images.every(isR2Url);

    if (mainAlreadyMigrated && imagesAlreadyMigrated) {
      console.log(`[SKIP] ${name}`);
      skipped++;
      continue;
    }

    console.log(`[MIGRATE] ${name} (${id})`);
    let anyFailed = false;

    // ── main_image ───────────────────────────────────────────────────────────
    let newMainImage = main_image;

    if (!mainAlreadyMigrated) {
      const r2Key = `products/${id}/main.webp`;
      const url = await migrateImage(main_image, r2Key, 'main_image');
      if (url) {
        newMainImage = url;
      } else {
        anyFailed = true;
      }
    } else {
      console.log('  ✓ main_image already on R2, skipping');
    }

    // ── images[] ─────────────────────────────────────────────────────────────
    const newImages: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const entry = images[i];

      if (isR2Url(entry)) {
        // Already migrated on a previous run
        newImages.push(entry);
        continue;
      }

      // Construct the full Supabase URL from the relative path
      const sourceUrl = `${SUPABASE_IMAGE_BASE}/${slug}/${entry}`;
      const r2Key = `products/${id}/images/${i}.webp`;

      const url = await migrateImage(sourceUrl, r2Key, `images[${i}]`);
      if (url) {
        newImages.push(url);
      } else {
        // Keep original so the row isn't silently broken
        newImages.push(entry);
        anyFailed = true;
      }
    }

    if (anyFailed) {
      console.log(`  ✗ One or more images failed – DB row NOT updated\n`);
      failed++;
      continue;
    }

    // ── Update Neon ──────────────────────────────────────────────────────────
    try {
      await db
        .update(schema.products)
        .set({ main_image: newMainImage, images: newImages })
        .where(eq(schema.products.id, id));
      console.log(`  ✓ Neon row updated (main_image + ${newImages.length} images)\n`);
      migrated++;
    } catch (err) {
      console.error(`  ✗ DB update failed: ${(err as Error).message}\n`);
      failed++;
    }
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log('─'.repeat(50));
  console.log('Done.');
  console.log(`  Migrated : ${migrated}`);
  console.log(`  Skipped  : ${skipped}`);
  console.log(`  Failed   : ${failed}`);
  console.log();
  if (migrated > 0) {
    console.log(
      'NOTE: The images[] column now stores full R2 URLs.\n' +
      'Update any app code that previously built URLs as:\n' +
      '  `${IMAGE_URL}/${slug}/${entry}`\n' +
      'to use the entry directly:\n' +
      '  `${entry}`',
    );
  }
}

migrateProductImages().catch(err => {
  console.error(err);
  process.exit(1);
});
