import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../../db';
import {
  patterns,
  categories as categoriesTable,
  products as productsTable,
  stitching as stitchingTable,
} from '../../../../db/schema';
import EditPatternClient from './EditPatternClient';

export const metadata: Metadata = { title: 'Edit Pattern | Admin' };

type Props = { params: Promise<{ id: string }> };

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isPatternId(id: string) {
  return UUID_PATTERN.test(id);
}

export default async function EditPatternPage({ params }: Props) {
  'use cache';
  cacheLife('minutes');
  cacheTag('patterns');

  const { id } = await params;

  if (!isPatternId(id)) notFound();

  const [pattern, categories, products, stitching] = await Promise.all([
    db
      .select({
        id: patterns.id,
        name: patterns.name,
        image: patterns.image,
        document: patterns.document,
        product_id: { id: productsTable.id, name: productsTable.name },
        category: { id: categoriesTable.id, name: categoriesTable.name },
        stitching: { id: stitchingTable.id, name: stitchingTable.name },
      })
      .from(patterns)
      .innerJoin(productsTable, eq(patterns.product_id, productsTable.id))
      .innerJoin(categoriesTable, eq(patterns.category, categoriesTable.id))
      .innerJoin(stitchingTable, eq(patterns.stitching, stitchingTable.id))
      .where(eq(patterns.id, id))
      .then((rows) => rows[0] ?? null),
    db.select({ id: categoriesTable.id, name: categoriesTable.name }).from(categoriesTable),
    db.select({ id: productsTable.id, name: productsTable.name }).from(productsTable),
    db.select({ id: stitchingTable.id, name: stitchingTable.name }).from(stitchingTable),
  ]);

  if (!pattern) return notFound();

  return (
    <EditPatternClient
      pattern={pattern as any}
      categories={(categories ?? []) as any}
      products={(products ?? []) as any}
      stitching={(stitching ?? []) as any}
    />
  );
}
