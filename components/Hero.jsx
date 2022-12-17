/* eslint-disable @next/next/no-img-element */
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();

  return (
    <div className="relative isolate">
      <Image
        src="/images/hero.jpeg"
        alt="hero"
        priority
        quality={75}
        className="aspect-video object-cover w-full"
        height={6000}
        width={4000}
      />
      <div className="absolute inset-0">
        <div className="my-auto max-w-7xl mx-auto h-full py-12 flex flex-col items-center justify-center">
          <h1 className="font-georgiaBold text-white text-center text-2xl md:text-4xl lg:text-6xl">
           Yarns that inspire
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-12">
            <span
              onClick={() => {
                router.push("/yarns");
              }}
              className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
            >
              <img src="/images/Icons-03.svg" alt="" className="h-24 w-24" />
              <p className="text-xl">Browse Our Yarns</p>
            </span>
            <span
              onClick={() => {
                router.push("/patterns");
              }}
              className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
            >
              <img src="/images/Icons-02.svg" alt="" className="h-24 w-24" />
              <p className="text-xl">Browse Patterns</p>
            </span>
            <span
              onClick={() => {
                router.push("/tutorials");
              }}
              className="h-64 w-64 bg-accent/60 hover:bg-accent shadow-xl transition-colors duration-150 ease-out cursor-pointer hover:shadow-md rounded-lg text-white flex flex-col justify-center items-center"
            >
              <img src="/images/Icons-01.svg" alt="" className="h-24 w-24" />
              <p className="text-xl">Tutorials</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
