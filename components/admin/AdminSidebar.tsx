'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Square3Stack3DIcon,
  DocumentPlusIcon,
  BuildingStorefrontIcon,
  RectangleGroupIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  {
    name: 'Yarns & Products',
    href: '/admin/products',
    icon: Square3Stack3DIcon,
  },
  {
    name: 'Patterns',
    href: '/admin/patterns',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Add Pattern',
    href: '/admin/add-pattern',
    icon: DocumentPlusIcon,
  },
  {
    name: 'Stores',
    href: '/admin/stores',
    icon: BuildingStorefrontIcon,
  },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Skip sidebar layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between px-4 py-3 shadow">
        <Link href="/admin/products" className="font-georgiaBold text-lg text-amber-400">
          African Expressions Admin
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 rounded text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col justify-between transform transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <Link href="/admin/products" className="font-georgiaBold text-xl text-amber-400 block">
                African Expressions
              </Link>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/admin/products' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link / Return to main site */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center px-4 py-2.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeftStartOnRectangleIcon className="w-4 h-4 mr-2" />
            Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
