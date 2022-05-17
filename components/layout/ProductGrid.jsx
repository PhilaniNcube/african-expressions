/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import IMAGE_URL from '../../lib/image';

const ProductGrid = ({ products }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 my-8">
      {products.map((product) => (
        <Link href={`/yarns/${product.slug}`} passHref key={product.slug}>
          <div
            key={product.id}
            className="rounded relative shadow-md shadow-slate-600/20 cursor-pointer"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <img
              src={`${IMAGE_URL}/${product.slug}/${product.images[0]}`}
              alt={product.name}
              className="h-[350px] w-full object-contain rounded-lg"
            />
            <div className="flex flex-col items-center py-4">
              <p className="text-base md:text-xl font-medium text-slate-800">
                {product.name}
              </p>
              <p className="text-center text-xs text-slate-500 px-3">
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
        <p className="text-lg text-gray-700 underline underline-offset-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};
