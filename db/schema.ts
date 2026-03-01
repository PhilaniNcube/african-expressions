import {
  pgTable,
  uuid,
  text,
  real,
  integer,
  numeric,
} from 'drizzle-orm/pg-core';

// ─── Stores ──────────────────────────────────────────────────────────────────

export const stores = pgTable('stores', {
  id: uuid('id').defaultRandom().primaryKey(),
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

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull(),
  main_image: text('main_image').notNull(),
  images: text('images').array().notNull().default([]),
  description: text('description').notNull(),
  composition: text('composition').notNull(),
  yarn_weight: text('yarn_weight').notNull(),
  ball_weight: integer('ball_weight').notNull(),
  yarn_length: integer('yarn_length').notNull(),
  tension: text('tension'),
  needle_size: text('needle_size'),
  price: numeric('price', { precision: 10, scale: 2 }),
});

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
});

// ─── Stitching ───────────────────────────────────────────────────────────────

export const stitching = pgTable('stitching', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
});

// ─── Patterns ────────────────────────────────────────────────────────────────

export const patterns = pgTable('patterns', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  image: text('image').notNull(),
  document: text('document').notNull(),
  product_id: uuid('product_id')
    .notNull()
    .references(() => products.id),
  category: uuid('category')
    .notNull()
    .references(() => categories.id),
  stitching: uuid('stitching')
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
