'use client';

import React, { Fragment, useMemo, useState } from 'react';
import ProductGrid from '../../components/layout/ProductGrid';
import FilterSelect, { type FilterOption } from '../../components/ui/FilterSelect';
import type { Product } from '../../types';

const compositionFilters = [
  { label: 'All', value: '' },
  { label: 'Acrylic', value: 'acrylic' },
  { label: 'Alpaca', value: 'alpaca' },
  { label: 'Mohair', value: 'mohair' },
  { label: 'Nylon', value: 'nylon' },
  { label: 'Polyamide', value: 'polyamide' },
  { label: 'Silk', value: 'silk' },
  { label: 'Viscose', value: 'viscose' },
];

interface YarnsClientProps {
  initialProducts: Product[];
}

export default function YarnsClient({ initialProducts }: YarnsClientProps) {
  const [yarn, setYarn] = useState('');
  const [weight, setWeight] = useState('');
  const [composition, setComposition] = useState('');

  const products = useMemo(() => initialProducts ?? [], [initialProducts]);

  const yarnOptions = useMemo<FilterOption[]>(
    () => [
      { label: 'All', value: '' },
      ...Array.from(new Set(products.map((product) => product.name)))
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ label: name, value: name })),
    ],
    [products],
  );

  const weightOptions = useMemo<FilterOption[]>(
    () => [
      { label: 'All', value: '' },
      ...Array.from(new Set(products.map((product) => product.yarn_weight)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ label: name, value: name })),
    ],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const yarnQuery = yarn.trim().toLowerCase();
    const weightQuery = weight.trim().toLowerCase();
    const compositionQuery = composition.trim().toLowerCase();

    return products.filter(
      (product) =>
        (!yarnQuery || product.name.toLowerCase().includes(yarnQuery)) &&
        (!weightQuery || product.yarn_weight.toLowerCase() === weightQuery) &&
        (!compositionQuery || product.composition.toLowerCase().includes(compositionQuery)),
    );
  }, [products, yarn, weight, composition]);

  const activeFilterCount = [yarn, weight, composition].filter(Boolean).length;

  const clearFilters = () => {
    setYarn('');
    setWeight('');
    setComposition('');
  };

  return (
    <Fragment>
      <div className="px-6 mx-auto mt-4 max-w-7xl md:px-4 text-deep">
        <header className="w-full">
          <h1 className="text-2xl font-extrabold md:text-3xl lg:text-5xl font-georgiaBold text-accent">
            Yarns
          </h1>
          <p className="my-4">
            Delicately spun, offering shades and textures perfect for any project imaginable
          </p>

          <div className="z-30 py-4 border-y border-deep">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase font-futuraBold text-deep">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
              </p>
              {activeFilterCount > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-deep/60">
                    {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
                  </span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs uppercase underline font-futuraBold text-accent underline-offset-2 hover:text-dark"
                  >
                    Clear
                  </button>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-3">
              <FilterSelect
                label="By Yarn"
                value={yarn}
                options={yarnOptions}
                onChange={setYarn}
              />
              <FilterSelect
                label="By Weight"
                value={weight}
                options={weightOptions}
                onChange={setWeight}
              />
              <FilterSelect
                label="By Composition"
                value={composition}
                options={compositionFilters}
                onChange={setComposition}
              />
            </div>
          </div>
        </header>

        <main className="mt-6">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-futuraBold text-deep">No yarns match these filters</p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2 mt-4 text-sm text-white uppercase rounded-md bg-accent hover:bg-accent/90"
              >
                Clear filters
              </button>
            </div>
          )}
        </main>
      </div>
    </Fragment>
  );
}
