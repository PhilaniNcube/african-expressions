'use client';

/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '../../../types';

interface YarnDetailProps {
  product: Product;
}

export default function YarnDetail({ product }: YarnDetailProps) {
  const [image, setImage] = useState(product.images[0]);

  return (
    <Fragment>
      <section>
        <div className="px-6 mx-auto my-12 max-w-7xl lg:px-0">
          <span className="text-xl font-medium text-deep">
            <span className="text-accent">
              <Link href="/">Home</Link>
            </span>{' '}
            /{' '}
            <span className="font-medium cursor-pointer text-accent">
              <Link href="/yarns">Yarns</Link>
            </span>{' '}
            / {product.name}
          </span>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-center w-full py-2">
              <Image
                width={1080}
                height={1080}
                src={image}
                alt="Product"
                className="w-full h-[400px] object-contain"
              />
            </div>

            <div className="w-full p-6">
              <h1 className="text-2xl uppercase md:text-3xl lg:text-5xl font-georgia text-accent">
                {product.name}
              </h1>

              <p className="mt-2 text-md md:text-lg text-deep">{product.description}</p>

              <table className="w-full my-3">
                <thead className="hidden">
                  <tr className="w-full">
                    <td className="w-3/6"> </td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr className="w-full text-xs text-deep">
                    <td className="w-2/6 px-3">
                      <p className="w-4/6 mr-3 text-xs font-futuraBold text-deep">Composition:</p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-left text-deep">{product.composition}</p>
                    </td>
                  </tr>
                  <tr className="text-xs text-deep">
                    <td className="px-3">
                      <p className="w-4/6 text-xs font-futuraBold text-deep">Ball Weight:</p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-left text-deep">{product.ball_weight}g</p>
                    </td>
                  </tr>
                  <tr className="text-xs text-deep">
                    <td className="px-3">
                      <p className="w-4/6 text-xs text-deep font-futuraBold">Yarn Meterage:</p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-left text-deep">{product.yarn_length}m</p>
                    </td>
                  </tr>
                  <tr className="text-xs text-deep">
                    <td className="px-3">
                      <p className="w-4/6 text-xs text-deep font-futuraBold">Tension:</p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-left text-deep">{product.tension}</p>
                    </td>
                  </tr>
                  <tr className="text-xs text-deep">
                    <td className="px-3">
                      <p className="w-4/6 text-xs text-deep font-futuraBold">Needle Size:</p>
                    </td>
                    <td className="px-3">
                      <p className="text-xs text-left text-deep">{product.needle_size}</p>
                    </td>
                  </tr>
                  <tr className="text-xs text-deep">
                    <td className="px-3">
                      <p className="w-4/6 text-xs font-futuraBold text-deep">Yarn Weight:</p>
                    </td>
                    <td className="px-3">
                      <p className="self-start text-xs text-deep">{product.yarn_weight}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-sm text-gray-500 mt-3 italic uppercase max-w-[60ch]">
                All garments to be gently washed with the use of mild soap or should be dry cleaned
              </p>

              <Link href={`/patterns?search=${product.name}`} passHref>
                <button className="px-6 py-2 mt-8 text-base text-white uppercase rounded-md bg-accent hover:bg-accent/90 hover:shadow-md">
                  View Pattern
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-4">
            <p className="text-lg font-medium text-deep">Available Colours</p>
            <div className="flex flex-wrap gap-4 p-6">
              {product.images.map((url, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Image
                    width={600}
                    height={600}
                    src={url}
                    className="object-cover w-10 h-10 rounded cursor-pointer md:h-20 md:w-20"
                    alt={product.name}
                    onClick={() => {
                      setImage(url);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                  <p className="text-xs text-deep">{url.split('/').pop()?.split('.')[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
