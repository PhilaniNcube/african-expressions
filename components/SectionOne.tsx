"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import { CgInstagram } from 'react-icons/cg';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';



const SectionOne = () => {
  return (
    <Fragment>
      <section className="px-6 py-12 mx-auto max-w-7xl md:px-4">
        <div className="flex flex-col items-center justify-between w-full space-y-4 md:space-y-0 md:flex-row">
          <Link
            href="https://www.instagram.com/african_expressions_yarns/?hl=en"
            passHref
            className="flex items-center justify-center w-12 h-12 p-2 font-light text-white rounded-full bg-accent"
          >
            <FaInstagram className="w-8 h-8" />
          </Link>

          <Link
            href="https://www.facebook.com/AfricanExpressionsYarn/"
            passHref
            className="flex items-center justify-center w-12 h-12 p-2 font-light text-white rounded-full bg-accent"
          >
            <FaFacebookF className="w-8 h-8 p-2 font-light text-white rounded-full" />
          </Link>
        </div>
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 gap-6 mt-6 lg:grid-cols-4">
            <div className="w-full ">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/ae_2.png"
                  alt="image"
                  width={1000}
                  height={100}
                  className="object-cover w-full rounded-md shadow-lg aspect-square"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/ae_3.png"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="object-cover w-full rounded-md shadow-lg aspect-square"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/ae_4.png"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="object-cover w-full rounded-md shadow-lg aspect-square"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/ae_5.png"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="object-cover w-full rounded-md shadow-lg aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SectionOne;
