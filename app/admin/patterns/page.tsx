import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import {
  patterns,
  products,
  categories,
  stitching,
} from '../../../db/schema';
import PatternsTable from '../../../components/PatternsTable';

export const metadata: Metadata = { title: 'Patterns | Admin' };

export default async function AdminPatternsPage() {
  'use cache';
  cacheLife('minutes');
  cacheTag('patterns');

  const patternRows = await db
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
    .innerJoin(products, eq(patterns.product_id, products.id))
    .innerJoin(categories, eq(patterns.category, categories.id))
    .innerJoin(stitching, eq(patterns.stitching, stitching.id));

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-4 lg:px-0 py-12">
      <h1 className="text-3xl text-deep font-georgiaBold">Patterns</h1>
      <hr className="text-dark" />
      <PatternsTable patterns={patternRows as any} />
    </main>
  );
}
