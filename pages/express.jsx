import Image from 'next/image';
import React, { Fragment } from 'react';

const express = () => {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto my-8">
        <h1 className="font-georgiaBold text-2xl md:text-4xl lg:text-5xl text-gray-800">
          Express Yourself
        </h1>
        <p className="my-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          excepturi quod reiciendis?
        </p>

        <div className="w-10/12 mx-auto py-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="w-full py-3 px-6 shadow-lg shadow-gray-800/20 rounded-lg overflow-hidden hover:shadow-gray-800/40 relative">
            <Image
              className="aspect-square w-full object-cover "
              src="/images/Inspire.png"
              width={450}
              height={450}
              alt="Inspire"
            />
            <p className="text-lg font-medium text-gray-700 text-center">
              Inspire
            </p>
            <p className="text-xs text-gray-600 text-center">
              100% Merino Wool for 100% Creativity
            </p>
          </div>
          <div className="w-full py-3 px-6 shadow-lg shadow-gray-800/20 rounded-lg overflow-hidden hover:shadow-gray-800/40 relative">
            <Image
              className="aspect-square w-full object-cover "
              src="/images/Desire.png"
              width={450}
              height={450}
              alt="Desire"
            />
            <p className="text-lg font-medium text-gray-700 text-center">
              Desire
            </p>
            <p className="text-xs text-gray-600 text-center">
              Tantalising Blend for Natural Indulgence
            </p>
          </div>
          <div className="w-full py-3 px-6 shadow-lg shadow-gray-800/20 rounded-lg overflow-hidden hover:shadow-gray-800/40 relative">
            <Image
              className="aspect-square w-full object-cover "
              src="/images/Enchanted.png"
              width={450}
              height={450}
              alt="Enchanted"
            />
            <p className="text-lg font-medium text-gray-700 text-center">
              Enchanted
            </p>
            <p className="text-xs text-gray-600 text-center">
              The finest Merino, Kid Mohair & Superfine Alpaca blend
            </p>
          </div>
        </div>
        <h1 className="font-georgiaBold mt-6 text-2xl md:text-4xl lg:text-5xl text-gray-800">
          Tutorials
        </h1>
        <p className="my-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          excepturi quod reiciendis?
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <div className="w-full aspect-video">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/st_qKR9lrZE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="w-full aspect-video">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/t0bVjMmdi0o"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="w-full aspect-video">
            <iframe
              className="w-full aspect-video"
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

export default express;
