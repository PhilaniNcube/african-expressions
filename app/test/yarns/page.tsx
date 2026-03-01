import type { Metadata } from 'next';
import Link from 'next/link';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import { products } from '../../../db/schema';
import { asc } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Neon Test – Yarns | African Expressions',
};

export default async function TestYarnsPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('products');

  const data = await db.select().from(products).orderBy(asc(products.type));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/test" className="text-sm text-gray-500 hover:underline">
          ← Test pages
        </Link>
        <h1 className="text-2xl font-bold">
          Yarns / Products{' '}
          <span className="ml-2 rounded-full bg-gray-100 px-3 py-0.5 text-base font-normal text-gray-600">
            {data.length}
          </span>
        </h1>
      </div>

      <p className="mb-6 text-sm text-green-700 font-medium bg-green-50 border border-green-200 rounded px-4 py-2 inline-block">
        Data source: Neon (PostgreSQL) via Drizzle ORM
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Composition</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Ball (g)</th>
              <th className="px-4 py-3">Length (m)</th>
              <th className="px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              data.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 capitalize">{product.type}</td>
                  <td className="px-4 py-3">{product.composition}</td>
                  <td className="px-4 py-3">{product.yarn_weight}</td>
                  <td className="px-4 py-3">{product.ball_weight}</td>
                  <td className="px-4 py-3">{product.yarn_length}</td>
                  <td className="px-4 py-3">
                    {product.price != null ? `R${product.price}` : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
