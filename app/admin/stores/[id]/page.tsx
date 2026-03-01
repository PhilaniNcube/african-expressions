import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import supabase from '../../../../utils/supabase';
import EditStoreClient from './EditStoreClient';

export const metadata: Metadata = { title: 'Edit Store | Admin' };

type Props = { params: Promise<{ id: string }> };

export default async function EditStorePage({ params }: Props) {
  'use cache';
  cacheLife('minutes');

  const { id } = await params;

  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !store) return notFound();

  return <EditStoreClient store={store as any} />;
}
