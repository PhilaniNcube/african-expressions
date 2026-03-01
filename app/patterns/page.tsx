import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../db';
import {
  patterns,
  products,
  categories,
  stitching,
} from '../../db/schema';
import PatternsClient from './PatternsClient';

export const metadata: Metadata = {
  title: 'Patterns | African Expressions',
};

async function getData() {
  'use cache';
  cacheLife('hours');
  cacheTag('patterns');

  const [patternsData, productsData, categoriesData] = await Promise.all([
    db
      .select({
        id: patterns.id,
        name: patterns.name,
        image: patterns.image,
        document: patterns.document,
        product_id: { id: products.id, name: products.name },
        category: { id: categories.id, name: categories.name },
        stitching: { id: stitching.id, name: stitching.name },
      })
      .from(patterns)
      .leftJoin(products, eq(patterns.product_id, products.id))
      .leftJoin(categories, eq(patterns.category, categories.id))
      .leftJoin(stitching, eq(patterns.stitching, stitching.id)),
    db.select().from(products),
    db.select().from(categories),
  ]);

  return {
    patterns: patternsData,
    products: productsData,
    categories: categoriesData,
  };
}

export default async function PatternsPage() {
  const { patterns: patternsData, products: productsData, categories: categoriesData } = await getData();

  return (
    <PatternsClient
      initialPatterns={patternsData as any}
      products={productsData as any}
      categories={categoriesData as any}
    />
  );
}
