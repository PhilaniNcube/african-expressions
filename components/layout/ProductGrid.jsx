/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import IMAGE_URL from '../../lib/image';

const ProductGrid = ({ products }) => {
  const [show, setShow] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 my-8">
      {products.map((product, i) => (
        <Link href={`/yarns/${product.slug}`} passHref key={product.slug}>
          <div
            key={product.id}
            className="rounded relative shadow-md shadow-slate-600/20 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`absolute inset-0 h-full w-full flex flex-col transition-all px-8 py-12 duration-300 justify-center items-center z-20 ${
                hoveredIndex === i ? 'bg-blend-overlay' : 'opacity-0 hidden '
              }`}
            >
              <div className="text-gray-800 w-full h-full rounded-lg bg-white/80 shadow-lg px-2 py-1 flex justify-center items-start flex-col">
                <p className=" text-base font-medium w-full border-b border-gray-700">
                  {product.name}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Composition:</span>
                  {product.composition}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Ball Weight:</span>
                  {product.ball_weight}g
                </p>
                <p className="text-xs">
                  <span className="font-medium">Yarn Meterage:</span>
                  {product.yarn_length}m
                </p>
                <p className="text-xs">
                  <span className="font-medium">Tension:</span>
                  {product.tension}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Needle Size:</span>
                  {product.needle_size}
                </p>
                <p className="text-xs">
                  <span className="font-medium">Count:</span>
                  {product.count}
                </p>
              </div>
            </div>

            <img
              src={`${IMAGE_URL}/${product.slug}/${product.images[0]}`}
              alt={product.name}
              className="h-[350px] w-full object-contain rounded-lg"
            />
            <div className="flex flex-col items-center py-4">
              <p className="text-base md:text-xl font-medium text-slate-800">
                {product.name}
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
        <p className="text-lg text-gray-700 underline underline-offset-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};
