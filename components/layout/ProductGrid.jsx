/* eslint-disable @next/next/no-img-element */
import React from 'react';
import IMAGE_URL from '../../lib/image';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 my-8">
      {products.map((product) => (
        <div key={product.id} className="rounded shadow-md shadow-slate-600/20">
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
      ))}
    </div>
  );
};

export default ProductGrid;
