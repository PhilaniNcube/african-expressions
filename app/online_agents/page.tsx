import type { Metadata } from 'next';
import { getOnlineStores } from '../../lib/getStores';
import OnlineAgentsClient from './OnlineAgentsClient';

export const metadata: Metadata = {
  title: 'Online Stockists | African Expressions',
};

export default async function OnlineAgentsPage() {
  const stores = await getOnlineStores();

  return <OnlineAgentsClient initialStores={stores ?? []} />;
}
