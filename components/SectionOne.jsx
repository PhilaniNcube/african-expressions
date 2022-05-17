import React, { Fragment } from 'react';
import { CgInstagram } from 'react-icons/cg';
import Image from 'next/image';

const SectionOne = () => {
  return (
    <Fragment>
      <section className="max-w-7xl mx-auto py-12 px-6 md:px-2 lg:px-0">
        <div className="flex flex-col md:flex-row w-full justify-around items-center">
          <span className="bg-yellow-600 flex items-center pr-3 rounded-full">
            <CgInstagram className="h-12 w-12 p-2 rounded-full border text-white font-light" />
            <h2 className="uppercase pl-6 text-base text-white font-medium">
              Follow African Expressions
            </h2>
          </span>

          <p className="text-base md:text-lg text-gray-700 font-medium">
            @african_expressions_yarns
          </p>
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
