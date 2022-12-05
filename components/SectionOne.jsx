import React, { Fragment } from 'react';
import Link from 'next/link';
import { CgInstagram } from 'react-icons/cg';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const SectionOne = () => {
  return (
    <Fragment>
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full justify-between items-center">
          <Link
            href="https://www.instagram.com/african_expressions_yarns/?hl=en"
            passHref
          >
            <span className="bg-accent flex  items-center pr-3 rounded-full">
              <FaInstagram className="h-12 w-12 p-2 rounded-full text-white font-light" />
              <h2 className="pl-6 text-xs md:text-sm  text-white font-medium">
                @african_expressions_yarns
              </h2>
            </span>
          </Link>

          <Link
            href="https://www.facebook.com/AfricanExpressionsYarn/"
            passHref
          >
            <span className="bg-accent flex items-center pr-3 rounded-full">
              <FaFacebookF className="h-12 w-12 p-2 rounded-full  text-white font-light" />
              <h2 className="pl-6 text-xs md:text-sm  text-white font-medium">
                African Expressions
              </h2>
            </span>
          </Link>
        </div>
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className=" w-full">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/wool-1.jpg"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="w-full aspect-video rounded-md shadow-lg object-cover"
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/wool-2.jpg"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="w-full aspect-video rounded-md shadow-lg object-cover"
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/wool-3.jpg"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="w-full aspect-video rounded-md shadow-lg object-cover"
                />
              </div>
            </div>
            <div className=" w-full">
              <div className="w-full h-full rounded-sm">
                <Image
                  src="/images/wool.jpg"
                  alt="image"
                  width={1920}
                  height={1280}
                  className="w-full aspect-video rounded-md shadow-lg object-cover"
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
