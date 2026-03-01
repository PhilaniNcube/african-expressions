import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import supabase from '../../../../utils/supabase';
import EditPatternClient from './EditPatternClient';

export const metadata: Metadata = { title: 'Edit Pattern | Admin' };

type Props = { params: Promise<{ id: string }> };

export default async function EditPatternPage({ params }: Props) {
  'use cache';
  cacheLife('minutes');

  const { id } = await params;

  const [
    { data: pattern, error },
    { data: categories },
    { data: products },
    { data: stitching },
  ] = await Promise.all([
    supabase
      .from('patterns')
      .select('*, product_id(*), category(*), stitching(*)')
      .eq('id', id)
      .single(),
    supabase.from('category').select('id, name'),
    supabase.from('products').select('id, name'),
    supabase.from('stitching').select('id, name'),
  ]);

  if (error || !pattern) return notFound();

  return (
    <EditPatternClient
      pattern={pattern as any}
      categories={(categories ?? []) as any}
      products={(products ?? []) as any}
      stitching={(stitching ?? []) as any}
    />
  );
}
