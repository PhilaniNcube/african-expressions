import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import AdminStoresClient from './AdminStoresClient';
import getStores from '@/lib/getStores';

export const metadata: Metadata = { title: 'Stores | Admin' };

export default async function AdminStoresPage() {
  'use cache';
  cacheLife('minutes');
  cacheTag('stores');

  const stores = await getStores();

  return <AdminStoresClient initialStores={(stores ?? []) as any} />;
}
