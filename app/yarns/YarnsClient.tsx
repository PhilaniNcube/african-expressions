'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useMemo, useState } from 'react';
import ProductGrid from '../../components/layout/ProductGrid';
import type { Product } from '../../types';

const composition = [
  { name: 'All', value: '' },
  { name: 'Acrylic', value: 'acrylic' },
  { name: 'Alpaca', value: 'alpaca' },
  { name: 'Mohair', value: 'mohair' },
  { name: 'Nylon', value: 'nylon' },
  { name: 'Polyamide', value: 'polyamide' },
  { name: 'Silk', value: 'silk' },
  { name: 'Viscose', value: 'viscose' },
];

interface YarnsClientProps {
  initialProducts: Product[];
}

export default function YarnsClient({ initialProducts }: YarnsClientProps) {
  const [filter, setFilter] = useState('');

  const weights = [...new Set(initialProducts?.map((product) => product.yarn_weight))];

  const filteredProducts = useMemo(
    () =>
      initialProducts?.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()) ||
          product.yarn_weight.toLowerCase().includes(filter.toLowerCase()) ||
          product.composition.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, initialProducts],
  );

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

          <div className="z-30 items-center justify-start hidden py-6 space-x-6 text-xl lg:flex border-y text-deep border-deep">
            <span className="px-3 py-1 text-sm uppercase border-r font-futuraBold border-deep">
              {filteredProducts?.length} Items
            </span>
            <span className="px-3 py-1 text-sm uppercase border-r border-gray-700">
              {filter ? `${filter}` : 'Filters'}
            </span>

            {/* By Yarn */}
            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full pl-3 pr-10 text-left uppercase bg-white rounded-lg cursor-default focus:outline-none">
                    <span className="block text-sm font-futuraBold">By Yarn</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions transition className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition duration-100 ease-in data-[closed]:opacity-0">
                      <ListboxOption
                        className={({ active }: { active: boolean }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-accent' : 'text-deep'}`}
                        value=""
                      >
                        <span className="block font-normal truncate">All</span>
                      </ListboxOption>
                      {initialProducts?.map((product) => (
                        <ListboxOption
                          key={product.id}
                          className={({ active }: { active: boolean }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-accent' : 'text-deep'}`}
                          value={product.name}
                        >
                          <span className="block font-normal truncate">{product.name}</span>
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </span>

            {/* By Weight */}
            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full pl-3 pr-10 text-left uppercase bg-white rounded-lg cursor-default focus:outline-none">
                    <span className="block text-sm font-futuraBold">By Weight</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions transition className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition duration-100 ease-in data-[closed]:opacity-0">
                      <ListboxOption
                        className={({ active }: { active: boolean }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-accent' : 'text-deep'}`}
                        value=""
                      >
                        <span className="block font-normal truncate">All</span>
                      </ListboxOption>
                      {weights?.map((weight, i) => (
                        <ListboxOption
                          key={i}
                          className={({ active }: { active: boolean }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-accent' : 'text-deep'}`}
                          value={weight}
                        >
                          <span className="block font-normal truncate">{weight}</span>
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </span>

            {/* By Composition */}
            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <ListboxButton className="relative w-full pl-3 pr-10 text-left uppercase bg-white rounded-lg cursor-default focus:outline-none">
                    <span className="block text-sm font-futuraBold">By Composition</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </ListboxButton>
                  <ListboxOptions transition className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition duration-100 ease-in data-[closed]:opacity-0">
                      {composition.map((item, i) => (
                        <ListboxOption
                          key={i}
                          className={({ active }: { active: boolean }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100 text-accent' : 'text-deep'}`}
                          value={item.value}
                        >
                          <span className="block font-normal truncate">{item.name}</span>
                        </ListboxOption>
                      ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </span>
          </div>
        </header>

        <main className="mt-6">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </Fragment>
  );
}
