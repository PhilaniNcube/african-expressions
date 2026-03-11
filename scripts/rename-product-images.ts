/**
 * Fix script: rename R2 image objects for every product so their keys
 * include the original colour code (from Supabase) instead of a plain
 * integer index.
 *
 * Before : products/{uuid}/images/0.webp, 1.webp, 2.webp …
 * After  : products/{uuid}/images/4003.webp, 4004.webp, 4008.webp …
 *
 * Steps:
 *   1. Fetch the original colour-code arrays from Supabase.
 *   2. Fetch the current R2-based arrays from Neon.
 *   3. For each product (matched by id), copy every R2 object to the new
 *      key and delete the old one, then update the Neon row.
 *
 * The arrays are in the same order, so index 0 in Neon corresponds to
 * index 0 in the Supabase images array.
 *
 * Run with:
 *   npx tsx scripts/rename-product-images.ts
 *
 * Optionally pass --dry-run to preview changes without making them:
 *   npx tsx scripts/rename-product-images.ts --dry-run
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import {
  S3Client,
  CopyObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import * as schema from '../db/schema';

// ─── Config ───────────────────────────────────────────────────────────────────

const DRY_RUN = process.argv.includes('--dry-run');

// Supabase (read-only – we just need the original images arrays)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// Neon
const neonSql = neon(process.env.DATABASE_URL!);
const db = drizzle(neonSql, { schema });

// R2
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

/**
 * Extract the R2 object key from a full public URL.
 * e.g. "https://pub-xxx.r2.dev/products/uuid/images/0.webp"
 *    → "products/uuid/images/0.webp"
 */
function urlToKey(url: string): string {
  return url.replace(`${R2_PUBLIC_URL}/`, '');
}

/**
 * Strip the file extension from a filename.
 * "4003.jpg" → "4003"
 */
function stripExt(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot === -1 ? filename : filename.substring(0, dot);
}

/**
 * Copy an R2 object to a new key, then delete the old one (= rename).
 */
async function renameR2Object(oldKey: string, newKey: string): Promise<void> {
  if (oldKey === newKey) return; // nothing to do

  // Copy to new key
  await r2.send(
    new CopyObjectCommand({
      Bucket: R2_BUCKET_NAME,
      CopySource: `${R2_BUCKET_NAME}/${oldKey}`,
      Key: newKey,
      ContentType: 'image/webp',
    }),
  );

  // Delete old key
  await r2.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: oldKey,
    }),
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) console.log('🏃 DRY RUN — no changes will be made\n');

  // 1. Fetch original colour codes from Supabase
  console.log('Fetching products from Supabase…');
  const { data: supabaseProducts, error: sbErr } = await supabase
    .from('products')
    .select('id, name, images');
  if (sbErr) throw new Error(`Supabase error: ${sbErr.message}`);
  if (!supabaseProducts?.length) throw new Error('No products in Supabase');

  // Build a lookup: product id → original images array (colour codes)
  const originalImagesMap = new Map<string, string[]>();
  for (const p of supabaseProducts) {
    originalImagesMap.set(p.id, p.images ?? []);
  }
  console.log(`  Found ${supabaseProducts.length} product(s) in Supabase\n`);

  // 2. Fetch current R2-mapped products from Neon
  console.log('Fetching products from Neon…');
  const neonProducts = await db.select().from(schema.products);
  console.log(`  Found ${neonProducts.length} product(s) in Neon\n`);

  let renamed = 0;
  let skipped = 0;
  let failed = 0;

  for (const product of neonProducts) {
    const { id, name, images: currentImages } = product;

    const originalImages = originalImagesMap.get(id);
    if (!originalImages) {
      console.log(`[SKIP] ${name} — not found in Supabase`);
      skipped++;
      continue;
    }

    if (originalImages.length === 0 && currentImages.length === 0) {
      console.log(`[SKIP] ${name} — no images`);
      skipped++;
      continue;
    }

    if (originalImages.length !== currentImages.length) {
      console.log(
        `[WARN] ${name} — array length mismatch ` +
        `(Supabase: ${originalImages.length}, Neon: ${currentImages.length}). Skipping.`,
      );
      skipped++;
      continue;
    }

    // Check if already renamed (URL contains a non-numeric filename like "4003.webp")
    const alreadyRenamed = currentImages.length > 0 && currentImages.every(url => {
      const parts = url.split('/');
      const filename = parts[parts.length - 1]; // e.g. "0.webp" or "4003.webp"
      const base = stripExt(filename);
      return isNaN(Number(base)); // true if NOT a plain number → already has colour code
    });

    if (alreadyRenamed) {
      console.log(`[SKIP] ${name} — already renamed`);
      skipped++;
      continue;
    }

    console.log(`[RENAME] ${name} (${id})`);

    const newImages: string[] = [];
    let anyFailed = false;

    for (let i = 0; i < currentImages.length; i++) {
      const currentUrl = currentImages[i];
      const colourCode = stripExt(originalImages[i]); // e.g. "4003"

      const oldKey = urlToKey(currentUrl);
      // Replace the last path segment: "products/{uuid}/images/0.webp" → "products/{uuid}/images/4003.webp"
      const keyParts = oldKey.split('/');
      keyParts[keyParts.length - 1] = `${colourCode}.webp`;
      const newKey = keyParts.join('/');

      const newUrl = `${R2_PUBLIC_URL}/${newKey}`;

      if (DRY_RUN) {
        console.log(`  [${i}] ${oldKey} → ${newKey}`);
        newImages.push(newUrl);
        continue;
      }

      try {
        process.stdout.write(`  [${i}] ${colourCode}…`);
        await renameR2Object(oldKey, newKey);
        newImages.push(newUrl);
        console.log(' ✓');
      } catch (err) {
        console.log(` ✗ ${(err as Error).message}`);
        // Keep original URL so we don't break the row
        newImages.push(currentUrl);
        anyFailed = true;
      }
    }

    if (anyFailed) {
      console.log(`  ✗ Some images failed — DB row NOT updated\n`);
      failed++;
      continue;
    }

    // Update Neon
    if (!DRY_RUN) {
      try {
        await db
          .update(schema.products)
          .set({ images: newImages })
          .where(eq(schema.products.id, id));
        console.log(`  ✓ DB updated (${newImages.length} images)\n`);
      } catch (err) {
        console.error(`  ✗ DB update failed: ${(err as Error).message}\n`);
        failed++;
        continue;
      }
    } else {
      console.log(`  → Would update DB with ${newImages.length} new URLs\n`);
    }

    renamed++;
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log('─'.repeat(50));
  console.log('Done.');
  console.log(`  Renamed : ${renamed}`);
  console.log(`  Skipped : ${skipped}`);
  console.log(`  Failed  : ${failed}`);
  if (DRY_RUN) console.log('\n(dry run — no actual changes were made)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
