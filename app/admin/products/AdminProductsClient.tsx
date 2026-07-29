'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import type { Product } from '@/types';

interface AdminProductsClientProps {
  products: Product[];
}

export default function AdminProductsClient({ products }: AdminProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.yarn_weight.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-georgiaBold">Yarns & Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage yarn details, composition, meterage, main image, and color gallery images.
          </p>
        </div>
      </div>

      {/* Filter / Search toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search yarns by name, composition, weight..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> of{' '}
          <span className="text-gray-900 font-bold">{products.length}</span> yarns
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Main Image Thumbnail */}
              <div className="relative w-full aspect-[4/3] bg-gray-100 border-b border-gray-100 overflow-hidden group">
                <Image
                  src={product.main_image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 font-medium">
                  <PhotoIcon className="w-3.5 h-3.5" />
                  {product.images?.length || 0} colors
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-georgiaBold text-lg text-gray-900 line-clamp-1">{product.name}</h3>

                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-medium border border-amber-200">
                    {product.yarn_weight}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {product.ball_weight}g / {product.yarn_length}m
                  </span>
                </div>

                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.composition}</p>

                {product.price && (
                  <p className="text-sm font-semibold text-gray-900 pt-1">R{product.price}</p>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 pt-0">
              <Link
                href={`/admin/products/${product.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit Yarn & Images
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm">No yarns matched your search filter.</p>
        </div>
      )}
    </div>
  );
}
