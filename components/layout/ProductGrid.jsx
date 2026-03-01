"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import IMAGE_URL from '../../lib/image';
import Image from 'next/image';

const ProductGrid = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 px-6 my-8 transition-all duration-500 ease-in-out md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 lg:px-0">
      {products?.map((product, i) => (
        <Link href={`/yarns/${product.slug}`} passHref key={product.slug}>
          <div
            key={product.id}
            className="relative rounded cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`absolute inset-0 h-full pointer-events-none w-full flex flex-col transition-opacity duration-1000 ease-in-out justify-center items-center z-20 ${
                hoveredIndex === i ? 'opacity-100' : 'opacity-0 '
              }`}
            >
              <div className="flex flex-col items-start justify-center w-full h-full px-8 py-20 space-y-2 rounded-lg text-deep bg-gray-600/40">
                <div className="flex flex-col justify-center w-full h-full px-6 py-12 bg-white">
                  <p className="w-full text-md font-futuraBold">
                    {product.name}
                  </p>
                  <p className="w-full pb-2 text-xs border-b border-gray-700 ">
                    {product.description}
                  </p>

                  <p className="mt-1 text-xs">
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

            <Image
              width={500}
              height={500}
              src={product.main_image}
              alt={product.name}
              quality={100}
              className="object-cover w-full rounded-lg aspect-square"
            />
            <div className="flex flex-col items-center px-8 py-4">
              <p className="text-base md:text-xl font-futuraBold text-deep">
                {product.name}
              </p>
              <p className="w-full text-sm font-medium text-center font-futuraBook">
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
    <div className="absolute inset-0 w-full h-full bg-white/60">
      <div className="flex items-center justify-center">
        <p className="text-lg underline text-deep underline-offset-2">
          {product.name}
        </p>
      </div>
    </div>
  );
};
