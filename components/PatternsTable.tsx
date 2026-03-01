"use client";

import { Pattern } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function PatternsTable({patterns}:{patterns:Pattern[]}) {

  const router = useRouter()

  return (
    <>
      <div className="py-12">
        <div className="container w-full mx-auto bg-white rounded shadow">
          <div className="flex flex-col items-start justify-between w-full p-8 lg:flex-row lg:items-stretch">
            <div className="flex flex-col items-start w-full lg:w-3/4 xl:w-2/3 lg:flex-row">
              <Link
                href="/admin/add-pattern"
                className="w-auto px-6 py-2 my-2 text-sm text-white transition duration-150 ease-in-out border border-transparent rounded focus:shadow-outline-gray lg:my-0 lg:ml-2 xl:ml-4 bg-dark focus:outline-none focus:border-gray-800 hover:bg-deep"
              >
                Add Pattern
              </Link>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="w-full h-16 py-8 bg-indigo-100 border-b border-gray-300">
                  {" "}
                  <th className="pl-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Title
                  </th>
                  <th className="pl-8 pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Category{" "}
                  </th>
                  <th className="pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Yarn
                  </th>
                  <th className="pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Stitching
                  </th>
                  <th className="pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Pattern Document
                  </th>
                  <th className="pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Pattern Image
                  </th>
                  <th className="pr-6 text-sm font-normal leading-4 tracking-normal text-left text-gray-600">
                    Edit Pattern
                  </th>
                </tr>
              </thead>
              <tbody>
                {patterns.map((pattern) => (
                  <tr
                    key={pattern.id}
                    className="h-24 transition duration-150 ease-in-out border-t border-b border-gray-300 cursor-pointer hover:border-indigo-300 hover:shadow-md"
                  >
                    {" "}
                    <td className="pr-6">
                      <div className="flex items-center justify-start w-full h-full">
                        <div className="px-5 py-2 text-sm leading-3 rounded-full text-dark font-montBold">
                          {pattern.name}
                        </div>
                      </div>
                    </td>
                    <td className="pl-8 pr-6 text-sm leading-4 tracking-normal text-left text-gray-800 whitespace-no-wrap">
                      {pattern.category.name}
                    </td>
                    <td className="pr-6 text-sm leading-4 tracking-normal text-gray-800 whitespace-no-wrap">
                      {pattern.product_id.name}
                    </td>
                    <td className="pr-6 text-sm leading-4 tracking-normal text-gray-800 whitespace-no-wrap">
                      {pattern.stitching.name}
                    </td>
                    <td className="pr-6 text-sm leading-4 tracking-normal whitespace-no-wrap">
                      <Link
                        className="px-4 py-2 text-white rounded bg-dark hover:bg-deep"
                        href={pattern.document}
                      >
                        View Pattern
                      </Link>
                    </td>
                    <td className="pr-6 text-sm leading-4 tracking-normal text-gray-800 whitespace-no-wrap">
                      <Link
                        className="px-4 py-2 text-white rounded bg-dark hover:bg-deep"
                        href={pattern.image}
                      >
                        View Image
                      </Link>
                    </td>
                    <td className="pr-6 text-sm leading-4 tracking-normal text-gray-800 whitespace-no-wrap">
                      <svg
                        onClick={() => router.push(`/admin/patterns/${pattern.id}`)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
