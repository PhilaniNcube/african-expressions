/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import supabase from '../../utils/supabase';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

const Pattern = ({ pattern }) => {
  const imageRef = useRef(null);

  const [imageHeight, setImageHeight] = useState(null);
  const [imageWidth, setImageWidth] = useState(null);

  console.log({ imageHeight, imageWidth });

  return (
    <main className="max-w-7xl py-12 mx-auto px-6 lg:px-4">
      <h1 className="font-georgia uppercase text-2xl text-accent md:text-4xl">
        {pattern.name}
      </h1>
      <button className="mt-8 bg-accent px-6 py-1 rounded text-white uppercase">
        Back To Patterns
      </button>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          ref={imageRef}
          className={`w-full object-cover`}
          alt={pattern.name}
          src={pattern.image}
        />
        <div className="w-full">
          <p className="text-2xl text-deep mb-2">
            <span className="font-futuraBold mr-6">Stitching:</span>
            <span className="font-futuraBook">{pattern.stitching.name}</span>
          </p>
          <p className="text-2xl text-deep mb-2">
            <span className="font-futuraBold mr-6">Category:</span>
            <span className="font-futuraBook">{pattern.category.name}</span>
          </p>
          <p className="text-2xl text-deep mb-6">
            <span className="font-futuraBold mr-6">Yarns:</span>
            <span className="font-futuraBook">{pattern.product_id.name}</span>
          </p>

          <Link href={pattern.document}>
            <a className="mt-8 bg-accent text-white rounded text-base lg:text-lg px-8 py-2 uppercase">
              Download Pattern
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Pattern;

export async function getServerSideProps({ params: { id } }) {
  console.log(id);

  let { data: patterns, error } = await supabase
    .from('patterns')
    .select('*, stitching(id, name), category(id, name), product_id(id, name)')
    .eq('id', id)
    .single();

  return {
    props: {
      pattern: patterns,
    },
  };
}
