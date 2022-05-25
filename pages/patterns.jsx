/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { Fragment, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import Masonry from 'react-masonry-css';
import { useQuery } from 'react-query';
import supabase from '../utils/supabase';

const Patterns = ({ initialData, categories }) => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stitchingFilter, setStitchingFilter] = useState('');

  const [image, setImage] = useState('');
  const [show, setShow] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const router = useRouter();

  const productsQuery = useQuery('yarns', async () => {
    let { data: products, error } = await supabase.from('products').select('*');

    return products;
  });

  const products = productsQuery.data;

  const patternsQuery = useQuery(
    'patterns',
    async () => {
      let { data: patterns, error } = await supabase
        .from('patterns')
        .select(
          '*, stitching(id, name), category(id, name), product_id(id, name)',
        );

      return patterns;
    },
    {
      initialData: initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const patterns = patternsQuery.data;

  console.log(categoryFilter);

  const filteredPatterns = useMemo(
    () =>
      patterns.filter((pattern) =>
        pattern.product_id.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, patterns],
  );

  filteredPatterns = useMemo(
    () =>
      patterns.filter((pattern) =>
        pattern.category.name
          .toLowerCase()
          .includes(categoryFilter.toLowerCase()),
      ),
    [categoryFilter, patterns],
  );

  filteredPatterns = useMemo(
    () =>
      patterns.filter((pattern) =>
        pattern.stitching.name
          .toLowerCase()
          .includes(stitchingFilter.toLowerCase()),
      ),
    [stitchingFilter, patterns],
  );

  const useCategoryFilter = () => {
    filteredPatterns = patterns.filter((pattern) =>
      pattern.category.name
        .toLowerCase()
        .includes(categoryFilter.toLowerCase()),
    );
  };

  return (
    <div className={`my-4 relative oveflow-scroll px-6 lg:px-0`}>
      <div className="max-w-7xl h-full mx-auto">
        {show && <Modal image={image} setShow={setShow} />}
        <div className="hidden lg:flex items-center z-30 py-2 border-y text-slate-800 text-xl border-gray-800 justify-center space-x-6">
          <span className="font-extrabold uppercase border-r text-sm border-gray-700 px-3">
            {filteredPatterns.length} Items
          </span>
          <span className="uppercase font-extrabold text-sm border-r border-gray-700 px-3">
            Filters
          </span>

          <span className="font-light uppercase z-[800] self-end flex justify-end flex-1 px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-default rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block truncate text-sm font-extrabold w-fit">
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
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
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </span>

          <span className="font-light uppercase z-[800] self-end flex justify-end flex-1 px-3">
            <Listbox value={categoryFilter} onChange={setCategoryFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-default rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block text-sm truncate font-extrabold w-fit">
                    {categoryFilter === '' ? 'By Category' : categoryFilter}
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
                        }`
                      }
                      value=""
                    >
                      {({ categoryFilter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              categoryFilter ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            All
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

                    {categories.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-gray-100 text-accent' : 'text-gray-800'
                          }`
                        }
                        value={category.name}
                      >
                        {({ categoryFilter }) => (
                          <Fragment>
                            <span
                              className={`block truncate ${
                                categoryFilter ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {category.name}
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

          <span className="font-light uppercase z-[800] self-end flex justify-end flex-1 px-3">
            <Listbox value={stitchingFilter} onChange={setStitchingFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full  cursor-default rounded-lg bg-white pl-3 pr-10 font-light uppercase text-left focus:outline-none">
                  <span className="block text-sm truncate font-extrabold w-fit">
                    {stitchingFilter === '' ? 'By Stitching' : stitchingFilter}
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
                        }`
                      }
                      value=""
                    >
                      {({ stitchingFilter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              stitchingFilter ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            All
                          </span>
                          {stitchingFilter ? (
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
                        }`
                      }
                      value="Knitting"
                    >
                      {({ stitchingFilter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              stitchingFilter ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            Knitting
                          </span>
                          {stitchingFilter ? (
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
                          active ? 'bg-gray-100 text-accent' : 'text-gray-800'
                        }`
                      }
                      value="Crotchet"
                    >
                      {({ stitchingFilter }) => (
                        <Fragment>
                          <span
                            className={`block truncate ${
                              stitchingFilter ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            Crotchet
                          </span>
                          {stitchingFilter ? (
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
        <div className="w-full grid gap-6 grid-cols-1 relative lg:grid-cols-4">
          <div className="columns-2 mt-24 lg:columns-4 col-span-1 h-full ovef lg:col-span-4">
            {filteredPatterns.map((pattern, i) => {
              return (
                <div
                  className="relative my-3 mx-1 rounded-md overflow-hidden"
                  key={pattern.id}
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
                        ? 'opacity-80 bg-blend-overlay bg-slate-800/50'
                        : 'opacity-0 hidden '
                    }`}
                  >
                    <h2 className="font-georgiaBold text-center px-2 text-xl text-white pb-6">
                      {pattern.name}
                    </h2>
                    <div
                      onClick={() => {
                        setShow(true);
                        setImage(pattern.image);
                      }}
                      className="flex items-center my-2"
                    >
                      <span className="bg-yellow-800 h-10 w-10 text-white flex items-center justify-center">
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
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                      <p className="py-3 px-4  bg-accent text-gray-800 font-georgia text-xs">
                        View Pattern
                      </p>
                    </div>
                    <div
                      onClick={() => router.push(pattern.document)}
                      className="md:flex items-center hidden"
                    >
                      <span className="bg-yellow-800 h-10 w-10 text-white flex items-center justify-center">
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
                      <p className="py-3 px-6 bg-accent/90 text-gray-800 font-georgia text-xs">
                        Download Pattern
                      </p>
                    </div>
                  </div>
                </div>
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
    .select('*, stitching(id, name), category(id, name), product_id(id, name)');

  let { data: products } = await supabase.from('products').select('*');

  let { data: category } = await supabase.from('category').select('*');

  return {
    props: {
      initialData: patterns,
      categories: category,
      error,
    },
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
