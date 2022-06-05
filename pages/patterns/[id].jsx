/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import supabase from '../../utils/supabase';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactImageZoom from 'react-image-zoom';

const Pattern = ({ pattern }) => {
  const imageRef = useRef(null);
const [width, setWidth] = useState(0)
const [height, setHeight] = useState(0)


const [zoom, setZoom] = useState(false)



  useEffect(() => {

    console.log(imageRef)
        setWidth(imageRef?.current?.width)
        setHeight(imageRef?.current?.height)
        console.log({width, height})

         function handleResize() {
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
          }



      window.addEventListener('resize', handleResize)

  },[])



  return (
    <main className="max-w-7xl py-12 mx-auto px-6 relative lg:px-4">
      {zoom && <ZoomImage setZoom={setZoom} image={pattern.image} />}
      <Link href="/patterns" passHref>
      <button className="mt-8 bg-accent px-6 py-1 rounded text-white uppercase">
        Back To Patterns
      </button>
      </Link>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
        <img ref={imageRef} className="w-full object-cover" src={pattern.image} alt="image" />
        <span onClick={() => setZoom(true)} className="text-deep absolute bg-slate-200 p-2 top-6 left-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"     strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"          />
          </svg>
        </span>
        </div>



        <div className="w-full">
      <h1 className="font-georgia uppercase text-2xl text-accent md:text-4xl">
        {pattern.name}
      </h1>

          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Stitching:</span>
            <span className="font-futuraBook">{pattern.stitching.name}</span>
          </p>
          <p className="text-md text-deep mb-2">
            <span className="font-futuraBold mr-6">Category:</span>
            <span className="font-futuraBook">{pattern.category.name}</span>
          </p>
          <p className="text-md text-deep mb-6">
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


const ZoomImage = ({setZoom, image}) => {
  return (
    <div className="w-full bg-deep absolute z-[1300] inset-0">
      <div className="md:w-[80%] mx-auto relative">
         <span onClick={() => setZoom(false)} className="absolute top-6 left-6 bg-white text-black p-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
</svg>
         </span>
      <img src={image} className="w-full object-cover" alt="Image" />
      </div>
    </div>
  )
}



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
