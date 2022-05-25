import React from 'react';

const tutorials = () => {
  return (
    <main className="max-w-7xl mx-auto py-8 px-6 md:px-4 lg:px-0 relative">
      <h1 className="text-4xl text-deep font-georgiaBold mb-6 text-center">
        Tutorials
      </h1>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-3">
        <div className="w-full flex flex-col items-center aspect-video">
          <iframe
            src="https://www.youtube.com/embed/T11flBhXCzo"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="text-base text-deep uppercase text-center">
            AFRICAN EXPRESSIONS HAND DYEING
          </p>
        </div>
        <div className="w-full flex flex-col items-center aspect-video">
          <iframe
            src="https://www.youtube.com/embed/st_qKR9lrZE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="text-base text-deep uppercase text-center">
            AFRICAN EXPRESSIONS HAND PAINTING
          </p>
        </div>
        <div className="w-full flex flex-col items-center aspect-video">
          <iframe
            src="https://www.youtube.com/embed/st_qKR9lrZE"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="text-base text-deep uppercase text-center">
            AFRICAS NATURAL BEAUTY
          </p>
        </div>
      </div>
    </main>
  );
};

export default tutorials;
