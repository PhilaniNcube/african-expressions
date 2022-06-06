/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] bg-home-bg bg-center  bg-blend-overlay bg-cover bg-no-repeat px-6 md:px-4">
      <div className="min-h-[60vh] my-auto max-w-7xl mx-auto py-12 flex flex-col items-center justify-center">
        <h1 className="font-georgiaBold text-deep text-center text-2xl md:text-4xl lg:text-6xl">
          A premium  <br /> twist
        </h1>
        <p className="text-deep text-center text-md md:text-lg w-full font-bold mt-4">
          Perfectly blended <br /> for any design.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-12">
          <span
            onClick={() => {
              router.push('/yarns');
            }}
            className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
          >
            <img src="/images/Icons-03.svg" alt="" className="h-24 w-24" />
            <p className="text-xl">Browse Our Yarns</p>
          </span>
          <span
            onClick={() => {
              router.push('/patterns');
            }}
            className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
          >
            <img src="/images/Icons-02.svg" alt="" className="h-24 w-24" />
            <p className="text-xl">Browse Patterns</p>
          </span>
          <span
            onClick={() => {
              router.push('/tutorials');
            }}
            className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
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
