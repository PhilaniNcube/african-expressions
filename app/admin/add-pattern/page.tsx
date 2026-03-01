import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import supabase from '../../../utils/supabase';
import AddPatternClient from './AddPatternClient';

export const metadata: Metadata = { title: 'Add Pattern | Admin' };

export default async function AddPatternPage() {
  'use cache';
  cacheLife('minutes');

  const [{ data: categories }, { data: products }, { data: stitching }] =
    await Promise.all([
      supabase.from('category').select('id, name'),
      supabase.from('products').select('id, name'),
      supabase.from('stitching').select('id, name'),
    ]);

  return (
    <AddPatternClient
      categories={(categories ?? []) as any}
      products={(products ?? []) as any}
      stitching={(stitching ?? []) as any}
    />
  );
}
