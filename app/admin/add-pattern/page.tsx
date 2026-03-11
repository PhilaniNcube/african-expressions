import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { db } from '../../../db';
import {
  categories as categoriesTable,
  products as productsTable,
  stitching as stitchingTable,
} from '../../../db/schema';
import AddPatternClient from './AddPatternClient';

export const metadata: Metadata = { title: 'Add Pattern | Admin' };

export default async function AddPatternPage() {
  'use cache';
  cacheLife('minutes');

  const [categories, products, stitching] = await Promise.all([
    db.select({ id: categoriesTable.id, name: categoriesTable.name }).from(categoriesTable),
    db.select({ id: productsTable.id, name: productsTable.name }).from(productsTable),
    db.select({ id: stitchingTable.id, name: stitchingTable.name }).from(stitchingTable),
  ]);

  return (
    <AddPatternClient
      categories={categories as any}
      products={products as any}
      stitching={stitching as any}
    />
  );
}
