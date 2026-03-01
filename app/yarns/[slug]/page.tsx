import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import supabase from '../../../utils/supabase';
import YarnDetail from './YarnDetail';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('name')
    .eq('slug', slug)
    .single();

  return { title: product ? `${product.name} | African Expressions` : 'Yarn' };
}

export default async function YarnPage({ params }: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !product) return notFound();

  return <YarnDetail product={product as any} />;
}
