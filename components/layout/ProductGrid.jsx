/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import IMAGE_URL from '../../lib/image';

const ProductGrid = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 transition-all duration-500 ease-in-out lg:grid-cols-3 gap-x-10 gap-y-10 my-8 px-6 lg:px-0">
      {products.map((product, i) => (
        <Link href={`/yarns/${product.slug}`} passHref key={product.slug}>
          <div
            key={product.id}
            className="rounded relative  cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`absolute inset-0 h-full pointer-events-none w-full flex flex-col transition-opacity duration-1000 ease-in-out justify-center items-center z-20 ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0 '
              }`}
            >
              <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                  <p className=" text-md font-futuraBold  w-full">
                    {product.name}
                  </p>
                  <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                    {product.description}
                  </p>

                  <p className="text-xs mt-1">
                    <span className="font-futuraBold">Composition:</span>
                    {product.composition}
                  </p>
                  <p className="text-xs">
                    <span className="font-futuraBold">Ball Weight:</span>
                    {product.ball_weight}g
                  </p>
                  <p className="text-xs">
                    <span className="font-futuraBold">Yarn Meterage:</span>
                    {product.yarn_length}m
                  </p>
                  <p className="text-xs">
                    <span className="font-futuraBold">Tension:</span>
                    {product.tension}
                  </p>
                  <p className="text-xs">
                    <span className="font-futuraBold">Needle Size:</span>
                    {product.needle_size}
                  </p>
                  <p className="text-xs ">
                    <span className="font-futuraBold">Count:</span>
                    {product.count}
                  </p>
                </div>
              </div>
            </div>

            <img
              src={`${IMAGE_URL}/${product.slug}/${product.images[0]}`}
              alt={product.name}
              className="h-[350px] w-full object-contain rounded-lg"
            />
            <div className="flex flex-col items-center px-8 py-4">
              <p className="text-base md:text-xl font-futuraBold text-deep">
                {product.name}
              </p>
              <p className=" text-xs text-center font-futuraBook w-full">
                {product.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;

const ProductDetails = ({ product }) => {
  return (
    <div className="bg-white/60 absolute inset-0 h-full w-full">
      <div className="flex justify-center items-center">
        <p className="text-lg text-deep underline underline-offset-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};
