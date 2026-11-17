"use client";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Pattern, Product, Category } from "../../types";
import Image from "next/image";
import FilterSelect, {
  type FilterOption,
} from "../../components/ui/FilterSelect";

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
  const [yarn, setYarn] = useState("");
  const [category, setCategory] = useState("");
  const [stitching, setStitching] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Deep links such as /patterns?search=Hope come from the yarn detail page.
  useEffect(() => {
    const search = new URLSearchParams(window.location.search).get("search");
    if (search) setYarn(search);
  }, []);

  const yarnOptions = useMemo<FilterOption[]>(
    () => [
      { label: "All", value: "" },
      ...Array.from(new Set(products?.map((product) => product.name) ?? []))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ label: name, value: name })),
    ],
    [products],
  );

  const categoryOptions = useMemo<FilterOption[]>(
    () => [
      { label: "All", value: "" },
      ...Array.from(new Set(categories?.map((item) => item.name) ?? []))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
        .map((name) => ({ label: name, value: name })),
    ],
    [categories],
  );

  const stitchingOptions: FilterOption[] = [
    { label: "All", value: "" },
    { label: "Knitting", value: "Knitting" },
    { label: "Crochet", value: "Crochet" },
  ];

  const filteredPatterns = useMemo(() => {
    const yarnQuery = yarn.trim().toLowerCase();
    const categoryQuery = category.trim().toLowerCase();
    const stitchingQuery = stitching.trim().toLowerCase();

    return initialPatterns.filter((pattern) => {
      const yarnName = pattern.product_id?.name?.toLowerCase() ?? "";
      const categoryName = pattern.category?.name?.toLowerCase() ?? "";
      const stitchingName = pattern.stitching?.name?.toLowerCase() ?? "";

      return (
        (!yarnQuery || yarnName.includes(yarnQuery) || pattern.name.toLowerCase().includes(yarnQuery)) &&
        (!categoryQuery || categoryName.includes(categoryQuery)) &&
        (!stitchingQuery || stitchingName.includes(stitchingQuery))
      );
    });
  }, [initialPatterns, yarn, category, stitching]);

  const activeFilterCount = [yarn, category, stitching].filter(Boolean).length;

  const clearFilters = () => {
    setYarn("");
    setCategory("");
    setStitching("");
  };

  return (
    <div className="relative px-6 my-4 overflow-scroll md:px-4">
      <div className="h-full mx-auto max-w-7xl">
        <h1 className="text-2xl font-extrabold md:text-3xl lg:text-5xl font-georgiaBold text-accent">
          Patterns
        </h1>
        <p className="my-4">
          Patterns for every skill level for both knitting and crochet.
        </p>

        <div className="z-30 py-4 border-y border-deep">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase font-futuraBold text-deep">
              {filteredPatterns.length}{" "}
              {filteredPatterns.length === 1 ? "Item" : "Items"}
            </p>
            {activeFilterCount > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-deep/60">
                  {activeFilterCount}{" "}
                  {activeFilterCount === 1 ? "filter" : "filters"} active
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
              label="By Category"
              value={category}
              options={categoryOptions}
              onChange={setCategory}
            />
            <FilterSelect
              label="By Stitching"
              value={stitching}
              options={stitchingOptions}
              onChange={setStitching}
            />
          </div>
        </div>

        <div className="w-full py-3">
          {filteredPatterns.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-futuraBold text-deep">
                No patterns match these filters
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2 mt-4 text-sm text-white uppercase rounded-md bg-accent hover:bg-accent/90"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="columns-2 md:columns-3">
              {filteredPatterns.map((pattern, i) => (
                <Link key={pattern.id} href={`/patterns/${pattern.id}`} passHref>
                  <div
                    className="relative mx-1 mb-4 overflow-hidden rounded-md"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      width={500}
                      height={800}
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
          )}
        </div>
      </div>
    </div>
  );
}
