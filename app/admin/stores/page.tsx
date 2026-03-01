import type { Metadata } from 'next';
import supabaseService from '../../../utils/supabaseService';
import AdminStoresClient from './AdminStoresClient';

export const metadata: Metadata = { title: 'Stores | Admin' };

export default async function AdminStoresPage() {
  const { data: stores, error } = await supabaseService.from('stores').select('*');

  if (error) console.error('Error fetching stores:', error.message);

  return <AdminStoresClient initialStores={(stores ?? []) as any} />;
}
