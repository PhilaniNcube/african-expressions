/**
 * One-shot migration script: copy all data from Supabase → Neon/Drizzle
 *
 * Run with:
 *   npx tsx scripts/migrate-to-neon.ts
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as schema from '../db/schema';

// ─── Clients ─────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const neonSql = neon(process.env.DATABASE_URL!);
const db = drizzle(neonSql, { schema });

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toId(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'id' in value) {
    return (value as { id: string }).id;
  }
  throw new Error(`Cannot extract id from: ${JSON.stringify(value)}`);
}

async function fetchAll<T>(table: string): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw new Error(`Supabase fetch error (${table}): ${error.message}`);
  return (data ?? []) as T[];
}

// ─── Migration steps ──────────────────────────────────────────────────────────

async function migrateCategories() {
  console.log('Migrating categories…');
  // Supabase table is named 'category' (singular)
  const rows = await fetchAll<{ id: string; name: string }>('category');
  if (!rows.length) { console.log('  no rows'); return; }

  await db
    .insert(schema.categories)
    .values(rows.map(r => ({ id: r.id, name: r.name })))
    .onConflictDoNothing();

  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateStitching() {
  console.log('Migrating stitching…');
  const rows = await fetchAll<{ id: string; name: string }>('stitching');
  if (!rows.length) { console.log('  no rows'); return; }

  await db
    .insert(schema.stitching)
    .values(rows.map(r => ({ id: r.id, name: r.name })))
    .onConflictDoNothing();

  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateStores() {
  console.log('Migrating stores…');
  const rows = await fetchAll<{
    id: string;
    name: string;
    streetAddress: string;
    city: string;
    contact: string | null;
    website: string | null;
    lat: number | string | null;
    long: number | string | null;
    image: string | null;
  }>('stores');
  if (!rows.length) { console.log('  no rows'); return; }

  // Skip rows missing required fields
  const valid = rows.filter(r => r.name && r.streetAddress && r.city);
  const skipped = rows.length - valid.length;
  if (skipped > 0) console.log(`  skipping ${skipped} incomplete rows`);

  await db
    .insert(schema.stores)
    .values(
      valid.map(r => ({
        id: r.id,
        name: r.name,
        streetAddress: r.streetAddress,
        city: r.city,
        contact: r.contact,
        website: r.website,
        lat: r.lat != null ? parseFloat(String(r.lat)) : null,
        long: r.long != null ? parseFloat(String(r.long)) : null,
        image: r.image,
      })),
    )
    .onConflictDoNothing();

  console.log(`  ✓ ${valid.length} rows`);
}

async function migrateProducts() {
  console.log('Migrating products…');
  const rows = await fetchAll<{
    id: string;
    name: string;
    slug: string;
    type: string;
    main_image: string;
    images: string[];
    description: string;
    composition: string;
    yarn_weight: string;
    ball_weight: number;
    yarn_length: number;
    tension: string | null;
    needle_size: string | null;
    price: number | null;
  }>('products');
  if (!rows.length) { console.log('  no rows'); return; }

  await db
    .insert(schema.products)
    .values(
      rows.map(r => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        type: r.type,
        main_image: r.main_image,
        images: r.images ?? [],
        description: r.description,
        composition: r.composition,
        yarn_weight: r.yarn_weight,
        ball_weight: r.ball_weight,
        yarn_length: r.yarn_length,
        tension: r.tension,
        needle_size: r.needle_size,
        price: r.price != null ? String(r.price) : null,
      })),
    )
    .onConflictDoNothing();

  console.log(`  ✓ ${rows.length} rows`);
}

async function migratePatterns() {
  console.log('Migrating patterns…');

  // Fetch with joins so category/stitching resolve to their full objects
  // (the raw columns in Supabase store integer FKs, not UUIDs)
  const { data, error } = await supabase
    .from('patterns')
    .select('id, name, image, document, product_id!inner(id), category!inner(id), stitching!inner(id)');

  if (error) throw new Error(`Supabase fetch error (patterns): ${error.message}`);

  const rows = (data ?? []) as Array<{
    id: string;
    name: string;
    image: string;
    document: string;
    product_id: { id: string };
    category: { id: string };
    stitching: { id: string };
  }>;

  if (!rows.length) { console.log('  no rows'); return; }

  // Guard: skip if already migrated (patterns get new UUIDs, can't use onConflictDoNothing)
  const existing = await db.select({ count: sql<number>`count(*)` }).from(schema.patterns);
  if (Number(existing[0].count) > 0) {
    console.log(`  already migrated (${existing[0].count} rows exist), skipping`);
    return;
  }

  await db
    .insert(schema.patterns)
    .values(
      rows.map(r => ({
        // Supabase uses integer PKs for patterns; let Neon generate new UUIDs
        name: r.name,
        image: r.image,
        document: r.document,
        product_id: r.product_id.id,
        category: r.category.id,
        stitching: r.stitching.id,
      })),
    )
    .onConflictDoNothing();

  console.log(`  ✓ ${rows.length} rows`);
}

// ─── Verify row counts ────────────────────────────────────────────────────────

async function printCounts() {
  const counts = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(schema.stores),
    db.select({ count: sql<number>`count(*)` }).from(schema.products),
    db.select({ count: sql<number>`count(*)` }).from(schema.categories),
    db.select({ count: sql<number>`count(*)` }).from(schema.stitching),
    db.select({ count: sql<number>`count(*)` }).from(schema.patterns),
  ]);

  console.log('\nNeon row counts after migration:');
  console.log(`  stores:     ${counts[0][0].count}`);
  console.log(`  products:   ${counts[1][0].count}`);
  console.log(`  categories: ${counts[2][0].count}`);
  console.log(`  stitching:  ${counts[3][0].count}`);
  console.log(`  patterns:   ${counts[4][0].count}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting Supabase → Neon migration…\n');

  // Insert in dependency order: referenced tables first
  await migrateCategories();
  await migrateStitching();
  await migrateProducts();
  await migrateStores();
  await migratePatterns();

  await printCounts();
  console.log('\nDone!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
