import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { getOnlineStores } from '../../lib/getStores';
import OnlineAgentsClient from './OnlineAgentsClient';

export const metadata: Metadata = {
  title: 'Online Stockists | African Expressions',
};

export default async function OnlineAgentsPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('stores');

  const stores = await getOnlineStores();

  return <OnlineAgentsClient initialStores={stores ?? []} />;
}
