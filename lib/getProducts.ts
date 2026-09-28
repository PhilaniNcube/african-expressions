import { cache } from 'react';
import { asc, eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../db';
import { products } from '../db/schema';
import { Product } from '../types';

const getProducts = cache(async (): Promise<Product[]> => {
  'use cache';
  cacheLife('content');
  cacheTag('products');

  const result = await db
    .select()
    .from(products)
    .orderBy(asc(products.type));

  return result.map((p) => ({
    ...p,
    price: p.price != null ? Number(p.price) : undefined,
  })) as Product[];
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  'use cache';
  cacheLife('content');
  cacheTag('products', `product-${slug}`);

  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .then((rows) => rows[0] ?? null);

  if (!result) return null;

  return {
    ...result,
    price: result.price != null ? Number(result.price) : undefined,
  } as Product;
});

export default getProducts;
