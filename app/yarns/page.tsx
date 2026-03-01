import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import getProducts from '../../lib/getProducts';
import YarnsClient from './YarnsClient';

export const metadata: Metadata = {
  title: 'Yarns | African Expressions',
  description: 'Our range of yarns',
};

export default async function YarnsPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('products');

  const products = await getProducts();

  return <YarnsClient initialProducts={products ?? []} />;
}
