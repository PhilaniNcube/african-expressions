/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import supabase from '../../utils/supabase';
import IMAGE_URL from '../../lib/image';

const Product = ({ product }) => {
  console.log(product);

  const [image, setImage] = useState(product.images[0]);

  return (
    <Fragment>
      <section>
        <div className="max-w-7xl mx-auto my-12">
          <span className="text-gray-700 text-xl font-medium">
            <span className="text-yellow-600">
              <Link href="/">Home</Link>
            </span>{' '}
            /{' '}
            <span className="text-yellow-800 cursor-pointer font-medium">
              <Link href="/yarns">Yarns</Link>
            </span>{' '}
            / {product.name}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full flex justify-center items-center py-2">
              <img
                src={`${IMAGE_URL}/${product.slug}/${image}`}
                alt="Product"
                className="w-full h-[600px] object-contain"
              />
            </div>

            <div className="w-full p-6">
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-georgiaBold text-yellow-700">
                {product.name}
              </h1>

              <p className="text-md md:text-lg text-yellow-900 mt-2">
                {product.description}
              </p>

              <span className="flex w-full justify-between mt-4 md:w-4/6">
                <p className="text-sm text-gray-900">Composition:</p>
                <p className="text-sm text-gray-700">{product.composition}</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Ball Weight:</p>
                <p className="text-sm text-gray-700">{product.ball_weight}g</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Yarn Meterage:</p>
                <p className="text-sm text-gray-700">{product.yarn_length}m</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Tension:</p>
                <p className="text-sm text-gray-700">{product.tension}m</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Needle Size:</p>
                <p className="text-sm text-gray-700">{product.needle_size}</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Count:</p>
                <p className="text-sm text-gray-700">{product.count}</p>
              </span>
              <span className="flex w-full justify-between mt-2 md:w-4/6">
                <p className="text-sm text-gray-900">Yarn Weight:</p>
                <p className="text-sm text-gray-700">{product.yarn_weight}</p>
              </span>

              <p className="text-sm text-gray-500 mt-3 italic uppercase max-w-[60ch]">
                All garments to be gentley washed with the use of mild soap or
                should be dry cleaned
              </p>

              <button className="bg-orange-600 text-white font-bold shadow-xl hover:bg-orange-500 hover:shadow-md mt-8 px-6 py-2 rounded-md text-base uppercase">
                View Pattern
              </button>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-gray-800">
              Available Colours
            </p>

            <div className="flex flex-wrap gap-2 p-6">
              {product.images.map((url, i) => (
                <img
                  key={i}
                  src={`${IMAGE_URL}/${product.slug}/${url}`}
                  className="h-20 w-20 rounded object-cover cursor-pointer"
                  alt={url}
                  onClick={() => setImage(url)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Product;

export async function getServerSideProps({ params: { slug } }) {
  let { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  return {
    props: {
      product: products,
    },
  };
}
