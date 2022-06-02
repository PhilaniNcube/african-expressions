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
        <div className="max-w-7xl mx-auto my-12 px-6 lg:px-0">
          <span className="text-deep text-xl font-medium">
            <span className="text-accent">
              <Link href="/">Home</Link>
            </span>{' '}
            /{' '}
            <span className="text-accent cursor-pointer font-medium">
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
              <h1 className="text-2xl md:text-3xl lg:text-5xl uppercase font-georgia text-accent">
                {product.name}
              </h1>

              <p className="text-md md:text-lg text-deep mt-2">
                {product.description}
              </p>

              <table className="w-full my-3">
                <thead className="hidden">
                  <tr className="w-full">
                    <td className="w-3/6"> </td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr className="text-deep w-full text-xs">
                    <td className="px-3 w-2/6">
                      <p className="text-xs font-futuraBold text-deep w-4/6 mr-3">
                        Composition:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.composition}
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs font-futuraBold text-deep w-4/6">
                        Ball Weight:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.ball_weight}g
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs text-deep font-futuraBold w-4/6">
                        Yarn Meterage:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.yarn_length}m
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs text-deep font-futuraBold w-4/6">
                        Tension:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.tension}
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs text-deep font-futuraBold w-4/6">
                        Needle Size:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.needle_size}
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs text-deep font-futuraBold w-4/6">
                        Count:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep text-left">
                        {product.count}
                      </p>
                    </td>
                  </tr>
                  <tr className="text-deep text-xs">
                    <td className="px-3">
                      <p className="text-xs font-futuraBold text-deep w-4/6">
                        Yarn Weight:
                      </p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-deep self-start">
                        {product.yarn_weight}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-sm text-gray-500 mt-3 italic uppercase max-w-[60ch]">
                All garments to be gentley washed with the use of mild soap or
                should be dry cleaned
              </p>

              <Link href="/patterns" passHref>
                <button className="bg-accent text-white hover:bg-accent/90 hover:shadow-md mt-8 px-6 py-2 rounded-md text-base uppercase">
                  View Pattern
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-4 w-full flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-deep">Available Colours</p>

            <div className="flex flex-wrap gap-4 p-6">
              {product.images.map((url, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img
                    src={`${IMAGE_URL}/${product.slug}/${url}`}
                    className="md:h-20 md:w-20 w-10 h-10  rounded object-cover cursor-pointer"
                    alt={url}
                    onClick={() => {
                      setImage(url);
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  />
                  <p className="text-xs text-deep">{url.split('.')[0]}</p>
                </div>
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
