/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { Fragment, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import supabase from '../utils/supabase';
import getProducts from '../lib/getProducts';

const Patterns = ({ initialData, categories, yarns }) => {
  const router = useRouter();

  console.log('Loading', initialData)

  const search = router.query?.search || "";


  const [filter, setFilter] = useState(search);
  const [hoveredIndex, setHoveredIndex] = useState(null);


    const {
      data: products,
      isLoading,
      isSuccess,
    } = useQuery(["yarns"], getProducts, {
      initialData: yarns,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });



  const {data:patterns, isLoading:isPatternsLoading, isError, isFetched} = useQuery(
    ['patterns'],
    async () => {
      let { data: patterns, error } = await supabase
        .from('patterns')
        .select(
          '*, stitching(*), category(*), product_id!inner(id, name)',
        );

      return patterns;
    },
    {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const initialPatterns = patterns;

  let filteredPatterns = useMemo(
    () =>
      patterns.filter(
        (pattern) =>
          pattern.product_id.name.toLowerCase().includes(filter.toLowerCase()) ||
          pattern.category.name.toLowerCase().includes(filter.toLowerCase()) ||
          pattern.stitching.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, patterns]
  );

  return (
    <div className={`my-4 relative oveflow-scroll px-6 md:px-4`}>
      <div className="max-w-7xl h-full mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-georgiaBold text-accent font-extrabold ">
          Patterns
        </h1>
        <p className="my-4">
          Patterns for every skill level for both knitting and crochet.
        </p>

        <div className="hidden lg:flex items-center z-30 py-6 border-y text-deep text-xl border-gray-800 justify-start space-x-6">
          <span className="font-futuraBold uppercase border-r py-1 text-sm border-gray-700 px-3">
            {filteredPatterns.length} Items
          </span>
          <span className="uppercase text-sm py-1 border-r border-gray-700 px-3">
            {filter === "" ? "Filters" : filter}
          </span>

          <span className="font-light uppercase z-[800] py-1 border-r border-gray-700 self-end flex justify-end  px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-pointer rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block truncate text-sm font-futuraBold w-fit">
                    {"By Yarn"}
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] md:w-[350px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100 text-accent" : "text-deep"
                        }`
                      }
                      value=""
                    >
                      {({ filter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              filter ? "font-medium" : "font-normal"
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
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-100 text-accent" : "text-deep"
                          }`
                        }
                        value={product.name}
                      >
                        {({ categoryFilter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                categoryFilter ? "font-medium" : "font-normal"
                              }`}
                            >
                              {product.name}
                            </span>
                            {categoryFilter ? (
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

          <span className="font-futuraBold uppercase z-[800] py-1 border-r border-gray-700  self-end flex justify-end  px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-pointer rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block text-sm truncate font-extrabold w-fit">
                    {"By Category"}
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-[200px] md:w-[350px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100 text-accent" : "text-deep"
                        }`
                      }
                      value=""
                    >
                      {({ filter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              filter ? "font-futuraBold" : "font-futuraBook"
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

                    {categories?.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-100 text-accent" : "text-deep "
                          }`
                        }
                        value={category.name}
                      >
                        {({ filter }) => (
                          <Fragment>
                            <span
                              className={`block truncate  ${
                                filter ? "font-futuraBold" : "font-futuraBook"
                              }`}
                            >
                              {category.name}
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

          <span className="font-light uppercase z-[800] self-end flex border-r border-gray-700  py-1 justify-end  px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-pointer rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block text-sm truncate font-futuraBold w-fit">
                    {"By Stitching"}
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100 text-accent" : "text-deep"
                        }`
                      }
                      value=""
                    >
                      {({ filter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              filter ? "font-medium" : "font-normal"
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100 text-accent" : "text-deep"
                        }`
                      }
                      value="Knitting"
                    >
                      {({ filter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              filter ? "font-medium" : "font-normal"
                            }`}
                          >
                            Knitting
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-gray-100 text-accent" : "text-deep"
                        }`
                      }
                      value="Crotchet"
                    >
                      {({ filter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              filter ? "font-medium" : "font-normal"
                            }`}
                          >
                            Crotchet
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
        <div className="w-full py-3">
          <div className="columns-2 md:columns-3 ">
            {filteredPatterns.map((pattern, i) => {
              return (
                <Link
                  key={pattern.id}
                  href={`/patterns/${pattern.id}`}
                  passHref
                >
                  <div
                    className="relative mb-4 mx-1 rounded-md overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      alt={pattern.name}
                      src={pattern.image}
                      className={`w-full h-full block z-10 shadow-xl  hover:shadow-sm object-cover rounded-md`}
                    />

                    <div
                      className={`absolute inset-0 h-full flex flex-col transition-all duration-300 justify-center items-center z-20 ${
                        hoveredIndex === i
                          ? "bg-blend-overlay bg-slate-800/50"
                          : "opacity-0 hidden "
                      }`}
                    >
                      <h2 className="font-georgiaBold uppercase text-center px-2 text-xl text-white pb-6">
                        {pattern.name}
                      </h2>

                      <div
                        onClick={() => router.push(pattern.document)}
                        className="md:flex items-center hidden"
                      >
                        <span className="bg-dark h-10 w-10 text-white rounded-l flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </span>
                        <p className="py-3 uppercase rounded-r cursor-pointer bg-accent text-gray-50 text-center w-[60%] md:w-[180px] text-xs">
                          View Pattern
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patterns;

export async function getServerSideProps() {
  let { data: patterns, error } = await supabase
    .from('patterns')
    .select('*, stitching(*), category(*), product_id!inner(id, name)');

  let { data: products } = await supabase.from('products').select('*');

  let { data: category } = await supabase.from('category').select('*');

  console.log({patterns})

  return {
    props: {
      yarns: products,
      initialData: patterns,
      categories: category,
      error,
    }
  };
}

function Modal({ image, setShow }) {
  return (
    <div className="fixed bottom-[5%] flex items-center w-screen h-screen z-40">
      <img
        className="h-2/3  mx-auto object-cover bg-slate-300 shadow-2xl shadow-black/40 p-2 rounded-md"
        src={image}
        alt="pattern"
        onClick={() => setShow(false)}
      />
    </div>
  );
}
