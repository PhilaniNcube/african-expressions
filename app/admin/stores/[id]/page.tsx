import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '../../../../db';
import { stores } from '../../../../db/schema';
import EditStoreClient from './EditStoreClient';

export const metadata: Metadata = { title: 'Edit Store | Admin' };

type Props = { params: Promise<{ id: string }> };

export default async function EditStorePage({ params }: Props) {
  'use cache';
  cacheLife('minutes');
  cacheTag('stores');

  const { id } = await params;

  const store = await db
    .select()
    .from(stores)
    .where(eq(stores.id, id))
    .then((rows) => rows[0] ?? null);

  if (!store) return notFound();

  return <EditStoreClient store={store} />;
}
