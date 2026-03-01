import { asc } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../db';
import { products } from '../db/schema';
import { Product } from '../types';

const getProducts = async (): Promise<Product[]> => {
  'use cache';
  cacheLife('hours');
  cacheTag('products');

  const result = await db
    .select()
    .from(products)
    .orderBy(asc(products.type));

  return result.map((p) => ({
    ...p,
    price: p.price != null ? Number(p.price) : undefined,
  })) as Product[];
};

export default getProducts;
