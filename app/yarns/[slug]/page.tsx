import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import YarnDetail from './YarnDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db
    .select({ name: products.name })
    .from(products)
    .where(eq(products.slug, slug))
    .then((rows) => rows[0] ?? null);

  return { title: product ? `${product.name} | African Expressions` : 'Yarn' };
}

export default async function YarnPage({ params }: Props) {
  'use cache';
  cacheLife('hours');
  cacheTag('products');

  const { slug } = await params;

  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .then((rows) => rows[0] ?? null);

  if (!product) return notFound();

  return <YarnDetail product={product as any} />;
}
