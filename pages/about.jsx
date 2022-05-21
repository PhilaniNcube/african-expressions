/* eslint-disable @next/next/no-img-element */
import React from 'react';

const about = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-4 lg:px-0 my-8">
      <h1 className="text-4xl text-slate-800 font-georgiaBold mb-6">
        About African Expressions
      </h1>
      <p className="text-sm md:text-base text-slate-700">
        African Expressions was born from the desire for Africa to share her
        natural beauty with the rest of the world. Through our unique range of
        yarns we express the essence of that which makes Africa magical
      </p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-4">
        <div className="w-full text-slate-700 text-base">
          <h3 className="font-georgiaBold">Natural beauty</h3>
          <p className="pb-3">
            African Expressions was born from the desire for Africa to share her
            natural beauty with the rest of the world. Through our unique range
            of yarns we express the essence of that which makes Africa magical.
          </p>
          <p className="py-3">
            Our network of local farmers breed stock bearing excellent fibres to
            ensure our yarns are naturally soft to the touch, easy to knit and
            luxuriously versatile.
          </p>
          <p className="py-3">
            365 days a year, 7 days a week, our farmers enjoy a close and
            special relationship with their herd and the animals enjoy a life
            unsurpassed, ensuring the production of a better quality of natural
            fibre for the benefit of all lovers of knitting.
          </p>
        </div>

        <div className="w-full">
          <img
            src="/images/sheep.jpg"
            alt="goats"
            className="w-full max-h-[400px] object-cover apsect-video rounded-sm shadow-lg"
          />
        </div>

        <div className="w-full">
          <img
            src="/images/fibre.jpg"
            alt="fibre"
            className="w-full max-h-[400px] object-cover apsect-video rounded-sm shadow-lg"
          />
        </div>
        <div className="w-full text-slate-700 text-base">
          <h3 className="font-georgiaBold">Natural Fibres</h3>
          <p className="pb-3">
            From farm to store, each and every process is handled with the
            utmost of care to ensure that the fibres are treated delicately and
            with the respect that they deserve.
          </p>
          <p className="py-3">
            Our range of select colours is inspired by the landscapes of South
            Africa - from sunrise to sunset.
          </p>
          <p className="py-3">
            Each colour represents one small element that makes Africa, Africa.
            Our heart and soul is knitted firmly into Africa and would like to
            invite you to join us in this “African Expressions” Experience.
          </p>
          <p className="py-3">
            SAMIL Natural Fibres is the proud manufacturer of all of African
            Expressions yarns. Through its involvement in all aspects of the
            industry, SAMIL’s aim is to provide a sustainable, affordable,
            superior quality product to the world, showcasing not only the
            product but also the industry, country of origin and individuals
            participating in the production of the fibre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default about;
