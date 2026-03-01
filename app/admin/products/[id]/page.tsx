import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import supabase from '../../../../utils/supabase';
import EditProductClient from './EditProductClient';

export const metadata: Metadata = { title: 'Edit Product | Admin' };

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) return notFound();

  return <EditProductClient product={product as any} />;
}
