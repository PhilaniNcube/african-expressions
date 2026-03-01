import type { Metadata } from 'next';
import getProducts from '../../lib/getProducts';
import YarnsClient from './YarnsClient';

export const metadata: Metadata = {
  title: 'Yarns | African Expressions',
  description: 'Our range of yarns',
};

export default async function YarnsPage() {
  const products = await getProducts();

  return <YarnsClient initialProducts={products ?? []} />;
}
