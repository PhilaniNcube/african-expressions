"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React, { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { Pattern, Product, Category } from "../../types";
import Image from "next/image";

interface PatternsClientProps {
  initialPatterns: Pattern[];
  products: Product[];
  categories: Category[];
}

export default function PatternsClient({
  initialPatterns,
  products,
  categories,
}: PatternsClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredPatterns = useMemo(
    () =>
      initialPatterns.filter(
        (pattern) =>
          pattern.product_id.name
            .toLowerCase()
            .includes(filter.toLowerCase()) ||
          pattern.category.name.toLowerCase().includes(filter.toLowerCase()) ||
          pattern.stitching.name.toLowerCase().includes(filter.toLowerCase()),
      ),
    [filter, initialPatterns],
  );

  return (
    <div className="relative px-6 my-4 overflow-scroll md:px-4">
      <div className="h-full mx-auto max-w-7xl">
        <h1 className="text-2xl font-extrabold md:text-3xl lg:text-5xl font-georgiaBold text-accent">
          Patterns
        </h1>
        <p className="my-4">
          Patterns for every skill level for both knitting and crochet.
        </p>

        <div className="z-30 items-center justify-start hidden py-6 space-x-6 text-xl border-gray-800 lg:flex border-y text-deep">
          <span className="px-3 py-1 text-sm uppercase border-r border-gray-700 font-futuraBold">
            {filteredPatterns.length} Items
          </span>
          <span className="px-3 py-1 text-sm uppercase border-r border-gray-700">
            {filter === "" ? "Filters" : filter}
          </span>

          {/* By Yarn */}
          <span className="font-light uppercase z-[800] py-1 border-r border-gray-700 self-end flex justify-end px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full pl-3 pr-10 font-light text-left uppercase bg-white rounded-lg cursor-pointer focus:outline-none">
                  <span className="block text-sm truncate font-futuraBold w-fit">
                    By Yarn
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-accent" : "text-deep"}`
                      }
                      value=""
                    >
                      {() => (
                        <span className="block font-normal truncate">All</span>
                      )}
                    </Listbox.Option>
                    {products?.map((product) => (
                      <Listbox.Option
                        key={product.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-accent" : "text-deep"}`
                        }
                        value={product.name}
                      >
                        {() => (
                          <span className="block font-normal truncate">
                            {product.name}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </span>

          {/* By Category */}
          <span className="font-futuraBold uppercase z-[800] py-1 border-r border-gray-700 self-end flex justify-end px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full pl-3 pr-10 font-light text-left uppercase bg-white rounded-lg cursor-pointer focus:outline-none">
                  <span className="block text-sm font-extrabold truncate w-fit">
                    By Category
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-accent" : "text-deep"}`
                      }
                      value=""
                    >
                      {() => (
                        <span className="block font-normal truncate">All</span>
                      )}
                    </Listbox.Option>
                    {categories?.map((category) => (
                      <Listbox.Option
                        key={category.id}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-accent" : "text-deep"}`
                        }
                        value={category.name}
                      >
                        {() => (
                          <span className="block font-normal truncate">
                            {category.name}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </span>

          {/* By Stitching */}
          <span className="font-light uppercase z-[800] self-end flex border-r border-gray-700 py-1 justify-end px-3">
            <Listbox value={filter} onChange={setFilter}>
              <div className="relative">
                <Listbox.Button className="relative w-full pl-3 pr-10 font-light text-left uppercase bg-white rounded-lg cursor-pointer focus:outline-none">
                  <span className="block text-sm truncate font-futuraBold w-fit">
                    By Stitching
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
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
                    {["", "Knitting", "Crochet"].map((val) => (
                      <Listbox.Option
                        key={val}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-gray-100 text-accent" : "text-deep"}`
                        }
                        value={val}
                      >
                        {() => (
                          <span className="block font-normal truncate">
                            {val || "All"}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </span>
        </div>

        <div className="w-full py-3">
          <div className="columns-2 md:columns-3">
            {filteredPatterns.map((pattern, i) => (
              <Link key={pattern.id} href={`/patterns/${pattern.id}`} passHref>
                <div
                  className="relative mx-1 mb-4 overflow-hidden rounded-md"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    alt={pattern.name}
                    src={pattern.image}
                    className="z-10 block object-cover w-full h-full rounded-md shadow-xl hover:shadow-sm"
                  />
                  <div
                    className={`absolute inset-0 h-full flex flex-col transition-all duration-300 justify-center items-center z-20 ${
                      hoveredIndex === i
                        ? "bg-blend-overlay bg-slate-800/50"
                        : "opacity-0 hidden"
                    }`}
                  >
                    <h2 className="px-2 pb-6 text-xl text-center text-white uppercase font-georgiaBold">
                      {pattern.name}
                    </h2>
                    <div
                      onClick={() => router.push(pattern.document)}
                      className="items-center hidden md:flex"
                    >
                      <span className="flex items-center justify-center w-10 h-10 text-white rounded-l bg-dark">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
