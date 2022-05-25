/* eslint-disable @next/next/no-img-element */
import React from 'react';

const SectionTwo = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6 md:px-2 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
        
          <h2 className="uppercase font-georgiaBold text-2xl md:text-3xl text-accent my-2">
            About African Expressions
          </h2>
          <p className="text-xs md:text-base text-deep">
            African Expressions was born from the desire for Africa to share her
            natural beauty with the rest of the world. Through our unique range
            of yarns we express the essence of that which makes Africa magical.
          </p>
          <p className="text-xs md:text-base py-2 text-deep">
            African Expressions also offers a wide range of free knitting and
            crochet patterns, perfect for when you want to start a project right
            away. Whether you are looking for patterns for beanies, ponchos,
            coats, scarves or just a little inspiration, we have a pattern just
            for you. Our patterns will walk you through, step-by-step. The
            techniques used range from classic to modern allowing you to enhance
            your experience when it comes to this age-old art.
          </p>
          <p className="text-xs md:text-base text-deep">
            No matter what your skill level is, practice your skills by making
            some of our more simple knits, like the blankets or scarves, or get
            creative with more advanced ideas, such as our coats and cardigans.
          </p>
        </div>
        <div className="w-full">
          <img
            alt="mohair"
            src="/images/yarn.jpg"
            className="w-full object-cover rounded-lg shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
