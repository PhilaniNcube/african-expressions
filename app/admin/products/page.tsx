import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '@/db';
import { products } from '@/db/schema';
import AdminProductsClient from './AdminProductsClient';

export const metadata: Metadata = { title: 'Yarns & Products | Admin' };

export default async function AdminProductsPage() {
  'use cache';
  cacheLife('minutes');
  cacheTag('products');

  const productRows = await db.select().from(products);

  return <AdminProductsClient products={productRows as any} />;
}
