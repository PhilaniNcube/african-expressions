import {
  sqliteTable,
  text,
  real,
  integer,
  numeric,
} from 'drizzle-orm/sqlite-core';

// ─── Helpers ────────────────────────────────────────────────────────────────

// SQLite has no native uuid type, so ids are stored as text and generated
// on the application side via crypto.randomUUID().
const primaryId = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

// ─── Stores ──────────────────────────────────────────────────────────────────

export const stores = sqliteTable('stores', {
  id: primaryId(),
  name: text('name').notNull(),
  streetAddress: text('streetAddress').notNull(),
  city: text('city').notNull(),
  contact: text('contact'),
  website: text('website'),
  lat: real('lat'),
  long: real('long'),
  image: text('image'),
});

// ─── Products ────────────────────────────────────────────────────────────────

export const products = sqliteTable('products', {
  id: primaryId(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull(),
  main_image: text('main_image').notNull(),
  // SQLite has no array type; stored as a JSON-encoded string.
  images: text('images', { mode: 'json' }).$type<string[]>().notNull().default([]),
  description: text('description').notNull(),
  composition: text('composition').notNull(),
  yarn_weight: text('yarn_weight').notNull(),
  ball_weight: integer('ball_weight').notNull(),
  yarn_length: integer('yarn_length').notNull(),
  tension: text('tension'),
  needle_size: text('needle_size'),
  price: numeric('price'),
});

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = sqliteTable('categories', {
  id: primaryId(),
  name: text('name').notNull(),
});

// ─── Stitching ───────────────────────────────────────────────────────────────

export const stitching = sqliteTable('stitching', {
  id: primaryId(),
  name: text('name').notNull(),
});

// ─── Patterns ────────────────────────────────────────────────────────────────

export const patterns = sqliteTable('patterns', {
  id: primaryId(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  document: text('document').notNull(),
  product_id: text('product_id')
    .notNull()
    .references(() => products.id),
  category: text('category')
    .notNull()
    .references(() => categories.id),
  stitching: text('stitching')
    .notNull()
    .references(() => stitching.id),
});

// ─── Inferred types ──────────────────────────────────────────────────────────

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Stitching = typeof stitching.$inferSelect;
export type NewStitching = typeof stitching.$inferInsert;

export type Pattern = typeof patterns.$inferSelect;
export type NewPattern = typeof patterns.$inferInsert;

// ─── Better Auth Tables ──────────────────────────────────────────────────────

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }),
});
