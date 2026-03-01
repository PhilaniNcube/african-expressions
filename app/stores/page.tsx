import type { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import getStores from '../../lib/getStores';
import MapComponent from '../../components/MapComponent';

export const metadata: Metadata = {
  title: 'Stores | African Expressions',
};

export default async function StoresPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('stores');

  const stores = await getStores();

  return (
    <div className="mx-auto max-w-7xl">
      <MapComponent stores={stores} />
    </div>
  );
}
