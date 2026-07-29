import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '@/db';
import { products } from '@/db/schema';
import EditProductClient from './EditProductClient';

export const metadata: Metadata = { title: 'Edit Yarn | Admin' };

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  'use cache';
  cacheLife('minutes');
  cacheTag('products');

  const { id } = await params;

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .then((rows) => rows[0] ?? null);

  if (!product) return notFound();

  return <EditProductClient product={product as any} />;
}
