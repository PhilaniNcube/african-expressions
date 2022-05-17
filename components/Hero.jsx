/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] bg-home-bg bg-center bg-slate-800 bg-blend-overlay bg-cover bg-no-repeat">
      <div className="min-h-[60vh] my-auto max-w-7xl mx-auto py-12 flex flex-col items-center justify-center">
        <h1 className="font-georgiaBold text-yellow-600 text-center text-2xl md:text-4xl lg:text-6xl">
          Classically Elegant <br /> & Naturally Soft
        </h1>
        <p className="text-yellow-50 text-center text-lg md:text-3xl mt-4">
          Thoughtfully blended <br /> for a creative twist
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-12">
          <span
            onClick={() => {
              router.push('/yarns');
            }}
            className="h-64 w-64 bg-yellow-400/30 hover:bg-yellow-800 shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
          >
            <img src="/images/Icons-03.svg" alt="" className="h-24 w-24" />
            <p className="text-xl">Browse Our Yarns</p>
          </span>
          <span
            onClick={() => {
              console.log('navigate');
            }}
            className="h-64 w-64 bg-yellow-400/30 hover:bg-yellow-800 shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
          >
            <img src="/images/Icons-02.svg" alt="" className="h-24 w-24" />
            <p className="text-xl">Browse Patterns</p>
          </span>
          <span
            onClick={() => {
              console.log('navigate');
            }}
            className="h-64 w-64 bg-yellow-400/30 hover:bg-yellow-800 shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
          >
            <img src="/images/Icons-01.svg" alt="" className="h-24 w-24" />
            <p className="text-xl">Tutorials</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
