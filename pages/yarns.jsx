import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import Head from 'next/head';
import React, { Fragment, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import ProductGrid from '../components/layout/ProductGrid';
import getProducts from '../lib/getProducts';

const Yarn = ({ initialData, error }) => {
  const [filter, setFilter] = useState('');

  const productsQuery = useQuery('yarns', getProducts, {
    initialData: initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products = productsQuery.data;

  const weights = [...new Set(products.map((product) => product.yarn_weight))];



  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(filter.toLowerCase()) ||
          product.yarn_weight.toLowerCase().includes(filter.toLowerCase()) ||
          product.composition.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, products],
  );

  return (
    <Fragment>
      <Head>
        <title>Yarns | African Expressions</title>
        <meta name="description" content="Our range of yarns" />
      </Head>
      <div className="max-w-7xl mx-auto mt-4 px-6 md:px-4 text-deep">
        <header className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-georgiaBold text-accent font-extrabold ">
            Yarns
          </h1>
          <p className="my-4">
            The yarns are spun into a fine, lightweight fabric that is perfect
            for sweaters, scarves, hats, gloves, blankets, and more.
          </p>

          <div className="hidden lg:flex items-center z-30 py-6 border-y text-deep text-xl border-deep justify-start space-x-6">
            <span className="text-sm uppercase font-futuraBold border-r py-1 border-deep px-3">
              {filteredProducts.length} Items
            </span>
            <span className="text-sm uppercase border-r py-1 border-gray-700 px-3">
              {filter ? `${filter}` : 'Filters'}
            </span>

            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10  uppercase text-left focus:outline-none">
                    <span className="block font-futuraBold text-sm">
                      By Yarn
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value=""
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              All
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      {products?.map((product) => (
                        <Listbox.Option
                          key={product.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-gray-100 text-accent' : 'text-deep'
                            }`
                          }
                          value={product.name}
                        >
                          {({ filter }) => (
                            <Fragment>
                              <span
                                className={`block truncate ${
                                  filter ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {product.name}
                              </span>
                              {filter ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </Fragment>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </span>

            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10  uppercase text-left focus:outline-none">
                    <span className="block font-futuraBold text-sm">
                      By Weight
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value=""
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              All
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      {weights?.map((weight, i) => (
                        <Listbox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-gray-100 text-accent' : 'text-deep'
                            }`
                          }
                          value={weight}
                        >
                          {({ filter }) => (
                            <Fragment>
                              <span
                                className={`block truncate ${
                                  filter ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {weight}
                              </span>
                              {filter ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </Fragment>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </span>

            <span className="uppercase z-[999] border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10  uppercase text-left focus:outline-none">
                    <span className="block font-futuraBold text-sm">
                      By Composition
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value=""
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              All
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="cotton"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Cotton
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="mohair"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Mohair
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="viscose"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Viscose
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="polyamide"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Polyamide
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="silk"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Silk
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="mulberry"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Mulberry
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="alpaca"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Alpaca
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="nylon"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Nylon
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-deep'
                          }`
                        }
                        value="acrylic"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Acrylic
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </Fragment>
                        )}
                      </Listbox.Option>
                    </Listbox.Options>
                  </Transition>
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
};

export default Yarn;

export async function getServerSideProps() {
  const { products, error } = await getProducts();



  return {
    props: {
      initialData: products,
      error,
    },
  };
}
