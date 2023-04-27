import Link from "next/link";
import React from "react";
export default function PatternsTable({patterns}) {
  return (
    <>
      <div className="py-12">
        <div className="mx-auto w-full container bg-white shadow rounded">
          <div className="flex flex-col lg:flex-row p-8 justify-between items-start lg:items-stretch w-full">

            <div className="w-full lg:w-3/4 xl:w-2/3 flex flex-col lg:flex-row items-start">
              <Link href="/admin/add-pattern" className="focus:shadow-outline-gray border border-transparent w-auto my-2 lg:my-0 lg:ml-2 xl:ml-4 bg-dark transition focus:outline-none focus:border-gray-800 focus:shadow-outline-gray duration-150 ease-in-out hover:bg-deep rounded text-white px-6 py-2 text-sm">
                Add Pattern
              </Link>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table className="min-w-full bg-white rounded">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8 bg-indigo-100">
                  {" "}
                  <th className="text-gray-600 font-normal pl-6 text-left text-sm tracking-normal leading-4">
                    Title
                  </th>
                  <th className="pl-8 text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Category{" "}
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Yarn
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Stitching
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Pattern Document
                  </th>
                  <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                    Pattern Image
                  </th>
                </tr>
              </thead>
              <tbody>
                {patterns.map((pattern) => (
                  <tr
                    key={pattern.id}
                    className="h-24 border-gray-300  border-t border-b hover:border-indigo-300 hover:shadow-md cursor-pointer transition duration-150 ease-in-out"
                  >
                    {" "}
                    <td className="pr-6">
                      <div className="w-full flex justify-start items-center h-full">
                        <div className="text-accent rounded-full text-sm leading-3 py-2 px-5">
                          {pattern.name}
                        </div>
                      </div>
                    </td>
                    <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800  tracking-normal leading-4">
                      {pattern.category.name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                      {pattern.product_id.name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                      {pattern.stitching.name}
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap tracking-normal leading-4">
                      <Link
                        className="bg-dark hover:bg-deep rounded px-4 py-2 text-white"
                        href={pattern.document}
                      >
                        View Pattern
                      </Link>
                    </td>
                    <td className="text-sm pr-6 whitespace-no-wrap text-gray-800  tracking-normal leading-4">
                      <Link
                        className="bg-dark hover:bg-deep rounded px-4 py-2 text-white"
                        href={pattern.image}
                      >
                        View Image
                      </Link>
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
