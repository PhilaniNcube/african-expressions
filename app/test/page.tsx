import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neon DB Test | African Expressions',
};

export default function TestIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Neon Database Test Pages</h1>
      <p className="text-gray-500 mb-8">
        These pages pull data directly from the Neon (PostgreSQL) database via
        Drizzle ORM, bypassing Supabase.
      </p>

      <ul className="space-y-4">
        {[
          { href: '/test/yarns', label: 'Yarns / Products', desc: 'All yarn products from the products table' },
          { href: '/test/stores', label: 'Stores', desc: 'All store locations from the stores table' },
          { href: '/test/patterns', label: 'Patterns', desc: 'All patterns joined with products, categories & stitching' },
        ].map(({ href, label, desc }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex flex-col gap-1 rounded-lg border border-gray-200 p-5 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-lg">{label}</span>
              <span className="text-sm text-gray-500">{desc}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
