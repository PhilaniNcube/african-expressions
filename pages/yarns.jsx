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

  console.log(filter);

  const productsQuery = useQuery('yarns', getProducts, {
    initialData: initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const products = productsQuery.data;

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, products],
  );

  console.log(filteredProducts);

  return (
    <Fragment>
      <Head>
        <title>Yarns | African Expressions</title>
        <meta name="description" content="Our range of yarns" />
      </Head>
      <div className="max-w-6xl mx-auto px-6 lg:px-0 mt-4">
        <header>
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-slate-800 font-extrabold ">
            Yarns
          </h1>
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur excepturi quod reiciendis?
          </p>
          <div className="hidden lg:flex py-4 border-y text-slate-800 text-xl border-gray-800 justify-center space-x-6">
            <span className="font-extrabold uppercase border-r border-gray-700 px-3">
              {filteredProducts.length} Items
            </span>
            <span className="font-light uppercase border-r border-gray-700 px-3">
              Filter
            </span>

            <span className="font-light uppercase border-r border-gray-700 px-3">
              <Listbox value={filter} onChange={setFilter}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                    <span className="block truncate w-fit">
                      {filter === '' ? 'By Yarn' : filter}
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Comfort"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Comfort
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Adore"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Adore
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Euphoria"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Euphoria
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Inspire"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Inspire
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Harmony"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Harmony
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Enchanted"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Enchanted
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Love"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Love
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Hope"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Hope
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Curiosity"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Curiosity
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Soul"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Soul
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Freedom"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Freedom
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Desire"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Desire
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
                          }`
                        }
                        value="Joy"
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                filter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              Joy
                            </span>
                            {filter ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            active
                              ? 'bg-gray-100 text-yellow-600'
                              : 'text-gray-800'
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
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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

  console.log(products);

  return {
    props: {
      initialData: products,
      error,
    },
  };
}
