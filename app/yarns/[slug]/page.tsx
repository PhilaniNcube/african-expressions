import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { getProductBySlug } from '../../../lib/getProducts';
import YarnDetail from './YarnDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return { title: product ? `${product.name} | African Expressions` : 'Yarn' };
}

export default async function YarnPage({ params }: Props) {
  'use cache';
  cacheLife('content');
  cacheTag('products');

  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return <YarnDetail product={product} />;
}
