import type { Metadata } from 'next';
import Link from 'next/link';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '../../../db';
import { patterns, products, categories, stitching } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Neon Test – Patterns | African Expressions',
};

export default async function TestPatternsPage() {
  'use cache';
  cacheLife('hours');
  cacheTag('patterns');

  // Fetch all patterns with joined product, category and stitching names
  const data = await db
    .select({
      id: patterns.id,
      name: patterns.name,
      image: patterns.image,
      document: patterns.document,
      productName: products.name,
      categoryName: categories.name,
      stitchingName: stitching.name,
    })
    .from(patterns)
    .leftJoin(products, eq(patterns.product_id, products.id))
    .leftJoin(categories, eq(patterns.category, categories.id))
    .leftJoin(stitching, eq(patterns.stitching, stitching.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/test" className="text-sm text-gray-500 hover:underline">
          ← Test pages
        </Link>
        <h1 className="text-2xl font-bold">
          Patterns{' '}
          <span className="ml-2 rounded-full bg-gray-100 px-3 py-0.5 text-base font-normal text-gray-600">
            {data.length}
          </span>
        </h1>
      </div>

      <p className="mb-6 text-sm text-green-700 font-medium bg-green-50 border border-green-200 rounded px-4 py-2 inline-block">
        Data source: Neon (PostgreSQL) via Drizzle ORM — joined with products,
        categories &amp; stitching tables
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Product (Yarn)</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Stitching</th>
              <th className="px-4 py-3">Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No patterns found
                </td>
              </tr>
            ) : (
              data.map((pattern) => (
                <tr key={pattern.id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pattern.image}
                      alt={pattern.name}
                      className="h-14 w-14 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{pattern.name}</td>
                  <td className="px-4 py-3">{pattern.productName ?? '—'}</td>
                  <td className="px-4 py-3">{pattern.categoryName ?? '—'}</td>
                  <td className="px-4 py-3">{pattern.stitchingName ?? '—'}</td>
                  <td className="px-4 py-3">
                    <a
                      href={pattern.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
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
