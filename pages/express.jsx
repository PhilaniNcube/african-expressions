/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import ProductGrid from "../components/layout/ProductGrid";
import supabase from '../utils/supabase';

const Express = ({products}) => {
  const [hoverInspire, setHoverInspire] = useState(false);
  const [hoverDesire, setHoverDesire] = useState(false);
  const [hoverEuphoria, setHoverEuphoria] = useState(false);
  const [hoverEnchanted, setHoverEnchanted] = useState(false);
  const [hoverCharmed, setHoverCharmed] = useState(false);

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-6 md:px-4 my-8">
        <h1 className="font-georgiaBold text-2xl md:text-4xl lg:text-5xl text-accent">
          Express Yourself
        </h1>
        <p className="my-4 text-deep">
          Let creativity free with the Express Yourself yarn bases. 100% natural
          yarns for 100% enjoyment. Use our tutorials to add a splash of colour
          and personal touch to your project.
        </p>

        <ProductGrid products={products} />

        <h1 className="font-georgiaBold mt-6 text-2xl md:text-4xl lg:text-5xl text-deep">
          Tutorials
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="w-full object-cover h-full aspect-[5/4]">
            <iframe
              className="w-full object-cover h-full aspect-[5/4]"
              src="https://www.youtube.com/embed/st_qKR9lrZE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="w-full object-cover h-full aspect-[5/4]">
            <iframe
              className="w-full object-cover h-full aspect-[5/4]"
              src="https://www.youtube.com/embed/t0bVjMmdi0o"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="w-full object-cover h-full aspect-[5/4]">
            <iframe
              className="w-full object-cover h-full aspect-[5/4]"
              src="https://www.youtube.com/embed/T11flBhXCzo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Express;


export async function getServerSideProps() {

   let { data: products, error } = await supabase.from('products').select('*').order('name', {descending: false}).eq('type', 'express');

  return {
    props: {
      products,
    },
  };
}
