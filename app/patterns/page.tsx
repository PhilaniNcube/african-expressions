import type { Metadata } from 'next';
import supabase from '../../utils/supabase';
import PatternsClient from './PatternsClient';

export const metadata: Metadata = {
  title: 'Patterns | African Expressions',
};

async function getData() {
  const [{ data: patterns }, { data: products }, { data: categories }] =
    await Promise.all([
      supabase
        .from('patterns')
        .select('*, stitching(*), category(*), product_id!inner(id, name)'),
      supabase.from('products').select('*'),
      supabase.from('category').select('*'),
    ]);

  return {
    patterns: patterns ?? [],
    products: products ?? [],
    categories: categories ?? [],
  };
}

export default async function PatternsPage() {
  const { patterns, products, categories } = await getData();

  return (
    <PatternsClient
      initialPatterns={patterns as any}
      products={products as any}
      categories={categories as any}
    />
  );
}
