import type { Metadata } from 'next';
import Link from 'next/link';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import { stores } from '../../../db/schema';
import { asc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Neon Test – Stores | African Expressions',
};

export default async function TestStoresPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('stores');

  const data = await db.select().from(stores).orderBy(asc(stores.name));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/test" className="text-sm text-gray-500 hover:underline">
          ← Test pages
        </Link>
        <h1 className="text-2xl font-bold">
          Stores{' '}
          <span className="ml-2 rounded-full bg-gray-100 px-3 py-0.5 text-base font-normal text-gray-600">
            {data.length}
          </span>
        </h1>
      </div>

      <p className="mb-6 text-sm text-green-700 font-medium bg-green-50 border border-green-200 rounded px-4 py-2 inline-block">
        Data source: Neon (PostgreSQL) via Drizzle ORM
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.length === 0 ? (
          <p className="col-span-full py-12 text-center text-gray-400">
            No stores found
          </p>
        ) : (
          data.map((store) => (
            <div
              key={store.id}
              className="rounded-lg border border-gray-200 p-5 flex flex-col gap-2"
            >
              <p className="font-semibold text-base">{store.name}</p>
              <p className="text-sm text-gray-600">
                {store.streetAddress}, {store.city}
              </p>
              {store.contact && (
                <p className="text-sm text-gray-500">
                  📞&nbsp;{store.contact}
                </p>
              )}
              {store.website && (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {store.website}
                </a>
              )}
              {store.lat != null && store.long != null && (
                <p className="text-xs text-gray-400">
                  {store.lat.toFixed(4)}, {store.long.toFixed(4)}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
