/**
 * One-shot migration script: copy all data from Neon (Postgres) → Turso (libSQL)
 *
 * - Reads from the Neon database via DATABASE_URL (read-only, non-destructive).
 * - Writes to Turso via TURSO_DATABASE_URL / TURSO_DATABASE_TOKEN.
 *
 * Expects the Turso schema to already exist (run `pnpm db:push` first).
 * Safe to re-run: inserts use ON CONFLICT DO NOTHING.
 *
 * Run with:
 *   pnpm db:migrate-neon-to-turso
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import * as schema from '../db/schema';

// ─── Clients ─────────────────────────────────────────────────────────────────

const neonSql = neon(process.env.DATABASE_URL!);

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_DATABASE_TOKEN!,
});
const db = drizzle(client, { schema });

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return value;
  const num = Number(value);
  if (!Number.isNaN(num)) return new Date(num * 1000);
  return new Date(String(value));
}

// Postgres allows 'NaN'::real for float columns; libSQL rejects non-finite
// numbers, so map those to null.
function toFiniteOrNull(value: unknown): number | null {
  if (value == null || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === 'string' && value.length > 0) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function chunk<T>(rows: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) {
    out.push(rows.slice(i, i + size));
  }
  return out;
}

type Row = Record<string, any>;

async function fetchRows(query: string): Promise<Row[]> {
  return (await neonSql.query(query)) as Row[];
}

async function insertChunked(
  table: SQLiteTable,
  rows: Row[],
  chunkSize: number,
) {
  for (const part of chunk(rows, chunkSize)) {
    await db.insert(table).values(part as never).onConflictDoNothing();
  }
}

// ─── Migration steps ─────────────────────────────────────────────────────────

async function migrateCategories() {
  console.log('Migrating categories…');
  const rows = await fetchRows('SELECT id, name FROM categories');
  if (!rows.length) return console.log('  no rows');

  await insertChunked(
    schema.categories,
    rows.map((r) => ({ id: r.id, name: r.name })),
    100,
  );
  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateStitching() {
  console.log('Migrating stitching…');
  const rows = await fetchRows('SELECT id, name FROM stitching');
  if (!rows.length) return console.log('  no rows');

  await insertChunked(
    schema.stitching,
    rows.map((r) => ({ id: r.id, name: r.name })),
    100,
  );
  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateProducts() {
  console.log('Migrating products…');
  const rows = await fetchRows(`
    SELECT
      id, name, slug, type, main_image,
      array_to_json(images)::text AS images,
      description, composition, yarn_weight,
      ball_weight, yarn_length, tension, needle_size, price
    FROM products
  `);
  if (!rows.length) return console.log('  no rows');

  await insertChunked(
    schema.products,
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      type: r.type,
      main_image: r.main_image,
      images: parseJsonArray(r.images),
      description: r.description,
      composition: r.composition,
      yarn_weight: r.yarn_weight,
      ball_weight: r.ball_weight,
      yarn_length: r.yarn_length,
      tension: r.tension,
      needle_size: r.needle_size,
      price: r.price != null ? String(r.price) : null,
    })),
    50,
  );
  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateStores() {
  console.log('Migrating stores…');
  const rows = await fetchRows(`
    SELECT id, name, "streetAddress", city, contact, website, lat, long, image
    FROM stores
  `);
  if (!rows.length) return console.log('  no rows');

  const valid = rows.filter((r) => r.name && r.streetAddress && r.city);
  const skipped = rows.length - valid.length;
  if (skipped > 0) console.log(`  skipping ${skipped} incomplete rows`);

  await insertChunked(
    schema.stores,
    valid.map((r) => ({
      id: r.id,
      name: r.name,
      streetAddress: r.streetAddress,
      city: r.city,
      contact: r.contact,
      website: r.website,
      lat: toFiniteOrNull(r.lat),
      long: toFiniteOrNull(r.long),
      image: r.image,
    })),
    100,
  );
  console.log(`  ✓ ${valid.length} rows`);
}

async function migratePatterns() {
  console.log('Migrating patterns…');
  const rows = await fetchRows(`
    SELECT id, name, image, document, product_id, category, stitching
    FROM patterns
  `);
  if (!rows.length) return console.log('  no rows');

  await insertChunked(
    schema.patterns,
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      image: r.image,
      document: r.document,
      product_id: r.product_id,
      category: r.category,
      stitching: r.stitching,
    })),
    100,
  );
  console.log(`  ✓ ${rows.length} rows`);
}

async function migrateAuthTables() {
  console.log('Migrating auth tables…');

  const users = await fetchRows(`
    SELECT id, name, email, "emailVerified" AS "emailVerified",
           image,
           EXTRACT(EPOCH FROM "createdAt")::double precision AS "createdAt",
           EXTRACT(EPOCH FROM "updatedAt")::double precision AS "updatedAt"
    FROM "user"
  `);
  if (users.length) {
    await insertChunked(
      schema.user,
      users.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        emailVerified: Boolean(r.emailVerified),
        image: r.image,
        createdAt: toDate(r.createdAt)!,
        updatedAt: toDate(r.updatedAt)!,
      })),
      100,
    );
    console.log(`  ✓ user: ${users.length} rows`);
  }

  const sessions = await fetchRows(`
    SELECT id, token,
           EXTRACT(EPOCH FROM "expiresAt")::double precision AS "expiresAt",
           EXTRACT(EPOCH FROM "createdAt")::double precision AS "createdAt",
           EXTRACT(EPOCH FROM "updatedAt")::double precision AS "updatedAt",
           "ipAddress", "userAgent", "userId"
    FROM session
  `);
  if (sessions.length) {
    await insertChunked(
      schema.session,
      sessions.map((r) => ({
        id: r.id,
        token: r.token,
        expiresAt: toDate(r.expiresAt)!,
        createdAt: toDate(r.createdAt)!,
        updatedAt: toDate(r.updatedAt)!,
        ipAddress: r.ipAddress,
        userAgent: r.userAgent,
        userId: r.userId,
      })),
      100,
    );
    console.log(`  ✓ session: ${sessions.length} rows`);
  }

  const accounts = await fetchRows(`
    SELECT id, "accountId", "providerId", "userId", "accessToken", "refreshToken",
           "idToken",
           EXTRACT(EPOCH FROM "accessTokenExpiresAt")::double precision AS "accessTokenExpiresAt",
           EXTRACT(EPOCH FROM "refreshTokenExpiresAt")::double precision AS "refreshTokenExpiresAt",
           scope, password,
           EXTRACT(EPOCH FROM "createdAt")::double precision AS "createdAt",
           EXTRACT(EPOCH FROM "updatedAt")::double precision AS "updatedAt"
    FROM account
  `);
  if (accounts.length) {
    await insertChunked(
      schema.account,
      accounts.map((r) => ({
        id: r.id,
        accountId: r.accountId,
        providerId: r.providerId,
        userId: r.userId,
        accessToken: r.accessToken,
        refreshToken: r.refreshToken,
        idToken: r.idToken,
        accessTokenExpiresAt: toDate(r.accessTokenExpiresAt),
        refreshTokenExpiresAt: toDate(r.refreshTokenExpiresAt),
        scope: r.scope,
        password: r.password,
        createdAt: toDate(r.createdAt)!,
        updatedAt: toDate(r.updatedAt)!,
      })),
      100,
    );
    console.log(`  ✓ account: ${accounts.length} rows`);
  }

  const verifications = await fetchRows(`
    SELECT id, identifier, value,
           EXTRACT(EPOCH FROM "expiresAt")::double precision AS "expiresAt",
           EXTRACT(EPOCH FROM "createdAt")::double precision AS "createdAt",
           EXTRACT(EPOCH FROM "updatedAt")::double precision AS "updatedAt"
    FROM verification
  `);
  if (verifications.length) {
    await insertChunked(
      schema.verification,
      verifications.map((r) => ({
        id: r.id,
        identifier: r.identifier,
        value: r.value,
        expiresAt: toDate(r.expiresAt)!,
        createdAt: toDate(r.createdAt),
        updatedAt: toDate(r.updatedAt),
      })),
      100,
    );
    console.log(`  ✓ verification: ${verifications.length} rows`);
  }
}

// ─── Verification ────────────────────────────────────────────────────────────

async function printCounts() {
  const count = async (table: SQLiteTable) => {
    const rows = await db.select({ c: sql<number>`count(*)` }).from(table);
    return Number(rows[0].c);
  };

  console.log('\nTurso row counts after migration:');
  console.log(`  stores:     ${await count(schema.stores)}`);
  console.log(`  products:   ${await count(schema.products)}`);
  console.log(`  categories: ${await count(schema.categories)}`);
  console.log(`  stitching:  ${await count(schema.stitching)}`);
  console.log(`  patterns:   ${await count(schema.patterns)}`);
  console.log(`  user:       ${await count(schema.user)}`);
  console.log(`  session:    ${await count(schema.session)}`);
  console.log(`  account:    ${await count(schema.account)}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting Neon → Turso migration…\n');

  // Insert in dependency order: referenced tables first
  await migrateCategories();
  await migrateStitching();
  await migrateProducts();
  await migrateStores();
  await migratePatterns();
  await migrateAuthTables();

  await printCounts();
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
