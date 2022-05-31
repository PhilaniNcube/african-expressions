/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';

const Express = () => {
  const [hoverInspire, setHoverInspire] = useState(false);
  const [hoverDesire, setHoverDesire] = useState(false);
  const [hoverEuphoria, setHoverEuphoria] = useState(false);
  const [hoverEnchanted, setHoverEnchanted] = useState(false);
  const [hoverCharmed, setHoverCharmed] = useState(false);

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
          <Link href={`/yarns/inspire`} passHref>
            <div
              className="rounded relative  cursor-pointer transition-all  duration-500 "
              onMouseEnter={() => setHoverInspire(true)}
              onMouseLeave={() => setHoverInspire(false)}
            >
              <div
                className={`absolute inset-0 h-full w-full flex flex-col transition-all  duration-800 justify-center items-center z-20 ${
                  hoverInspire ? 'bg-blend-overlay' : 'opacity-0 hidden '
                }`}
              >
                <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                  <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                    <p className=" text-md font-futuraBold  w-full">Inspire</p>
                    <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                      100% Merino Wool for 100% Creativity
                    </p>

                    <p className="text-xs mt-1">
                      <span className="font-futuraBold">Composition:</span>
                      100% Merino Wool
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Ball Weight:</span>
                      100g
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Yarn Meterage:</span>
                      87m
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Tension:</span>
                      10 stitches | 15 rows | 10x10cm
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Needle Size:</span>
                      10mm
                    </p>
                    <p className="text-xs ">
                      <span className="font-futuraBold">Count:</span>
                      N/A
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={`https://hpoimipfauvvgcjqrnso.supabase.co/storage/v1/object/public/images/inspire/inspire.png`}
                alt="Inspire"
                className="h-[350px] w-full object-contain rounded-lg"
              />
              <div className="flex flex-col items-center px-8 py-4">
                <p className="text-base md:text-xl font-futuraBold text-slate-800">
                  Inspire
                </p>
                <p className=" text-xs text-center font-futuraBook w-full">
                  100% Merino Wool for 100% Creativity
                </p>
              </div>
            </div>
          </Link>
          <Link href={`/yarns/desire`} passHref>
            <div
              className="rounded relative  cursor-pointer transition-all  duration-500 "
              onMouseEnter={() => setHoverDesire(true)}
              onMouseLeave={() => setHoverDesire(false)}
            >
              <div
                className={`absolute inset-0 h-full w-full flex flex-col transition-all  duration-800 justify-center items-center z-20 ${
                  hoverDesire ? 'bg-blend-overlay' : 'opacity-0 hidden '
                }`}
              >
                <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                  <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                    <p className=" text-md font-futuraBold  w-full">Desire</p>
                    <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                      Tantalizing to touch & a provocative blend for natural
                      indulgence
                    </p>

                    <p className="text-xs mt-1">
                      <span className="font-futuraBold">Composition:</span>
                      45% Merino Wool | 45% Kid Mohair | 10% Mulberry Silk
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Ball Weight:</span>
                      100g
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Yarn Meterage:</span>
                      150m
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Tension:</span>
                      18 stitches | 23 rows | 10x10cm
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Needle Size:</span>
                      6mm
                    </p>
                    <p className="text-xs ">
                      <span className="font-futuraBold">Count:</span>
                      N/A
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={`https://hpoimipfauvvgcjqrnso.supabase.co/storage/v1/object/public/images/desire/desire.png`}
                alt="Desire"
                className="h-[350px] w-full object-contain rounded-lg"
              />
              <div className="flex flex-col items-center px-8 py-4">
                <p className="text-base md:text-xl font-futuraBold text-slate-800">
                  Desire
                </p>
                <p className=" text-xs text-center font-futuraBook w-full">
                  Tantalizing to touch & a provocative blend for natural
                  indulgence
                </p>
              </div>
            </div>
          </Link>
          <Link href={`/yarns/euphoria`} passHref>
            <div
              className="rounded relative  cursor-pointer transition-all  duration-500 "
              onMouseEnter={() => setHoverEuphoria(true)}
              onMouseLeave={() => setHoverEuphoria(false)}
            >
              <div
                className={`absolute inset-0 h-full w-full flex flex-col transition-all  duration-800 justify-center items-center z-20 ${
                  hoverEuphoria ? 'bg-blend-overlay' : 'opacity-0 hidden '
                }`}
              >
                <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                  <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                    <p className=" text-md font-futuraBold  w-full">Euphoria</p>
                    <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                      Delightfully enticing
                    </p>

                    <p className="text-xs mt-1">
                      <span className="font-futuraBold">Composition:</span>
                      100% Merino Wool Superwash
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Ball Weight:</span>
                      100g
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Yarn Meterage:</span>
                      700m
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Tension:</span>
                      36 stitches | 38 rows | 10x10cm
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Needle Size:</span>
                      3mm
                    </p>
                    <p className="text-xs ">
                      <span className="font-futuraBold">Count:</span>
                      1/7nm
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={`https://hpoimipfauvvgcjqrnso.supabase.co/storage/v1/object/public/images/euphoria/euphoria.jpg`}
                alt="Inspire"
                className="h-[350px] w-full object-contain rounded-lg"
              />
              <div className="flex flex-col items-center px-8 py-4">
                <p className="text-base md:text-xl font-futuraBold text-slate-800">
                  Euphoria
                </p>
                <p className=" text-xs text-center font-futuraBook w-full">
                  Delightfully enticing
                </p>
              </div>
            </div>
          </Link>
          <Link href={`/yarns/enchanted`} passHref>
            <div
              className="rounded relative  cursor-pointer transition-all  duration-500 "
              onMouseEnter={() => setHoverEnchanted(true)}
              onMouseLeave={() => setHoverEnchanted(false)}
            >
              <div
                className={`absolute inset-0 h-full w-full flex flex-col transition-all  duration-800 justify-center items-center z-20 ${
                  hoverEnchanted ? 'bg-blend-overlay' : 'opacity-0 hidden '
                }`}
              >
                <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                  <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                    <p className=" text-md font-futuraBold  w-full">
                      Enchanted
                    </p>
                    <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                      A caressing blend of the finest Merino, Kid Mohair &
                      Superfine Alpaca
                    </p>

                    <p className="text-xs mt-1">
                      <span className="font-futuraBold">Composition:</span>
                      60% Merino Wool | 20% Kid Mohair | 20% Superfine Alpaca
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Ball Weight:</span>
                      100g
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Yarn Meterage:</span>
                      210m
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Tension:</span>
                      22 stitches | 30 rows | 10x10cm
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Needle Size:</span>
                      3.25mm-4.5mm
                    </p>
                    <p className="text-xs ">
                      <span className="font-futuraBold">Count:</span>
                      N/A
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={`https://hpoimipfauvvgcjqrnso.supabase.co/storage/v1/object/public/images/enchanted/enchanted.png`}
                alt="Inspire"
                className="h-[350px] w-full object-contain rounded-lg"
              />
              <div className="flex flex-col items-center px-8 py-4">
                <p className="text-base md:text-xl font-futuraBold text-slate-800">
                  Enchanted
                </p>
                <p className=" text-xs text-center font-futuraBook w-full">
                  A caressing blend of the finest Merino, Kid Mohair & Superfine
                  Alpaca
                </p>
              </div>
            </div>
          </Link>
          <Link href={`/yarns/charmed`} passHref>
            <div
              className="rounded relative  cursor-pointer transition-all  duration-500 "
              onMouseEnter={() => setHoverCharmed(true)}
              onMouseLeave={() => setHoverCharmed(false)}
            >
              <div
                className={`absolute inset-0 h-full w-full flex flex-col transition-all  duration-800 justify-center items-center z-20 ${
                  hoverCharmed ? 'bg-blend-overlay' : 'opacity-0 hidden '
                }`}
              >
                <div className="text-deep w-full h-full rounded-lg bg-gray-600/40 px-8 py-20 flex justify-center items-start flex-col space-y-2">
                  <div className="w-full h-full flex justify-center bg-white flex-col px-6 py-12">
                    <p className=" text-md font-futuraBold  w-full">Charmed</p>
                    <p className=" text-xs  w-full border-b pb-2 border-gray-700">
                      Follow the magical thread to an inspirational design
                    </p>

                    <p className="text-xs mt-1">
                      <span className="font-futuraBold">Composition:</span>
                      100% Merino Wool Superwash
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Ball Weight:</span>
                      100g
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Yarn Meterage:</span>
                      350m
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Tension:</span>
                      29 stitches | 38 rows | 10x10cm
                    </p>
                    <p className="text-xs">
                      <span className="font-futuraBold">Needle Size:</span>
                      3.5mm
                    </p>
                    <p className="text-xs ">
                      <span className="font-futuraBold">Count:</span>
                      2/7NM
                    </p>
                  </div>
                </div>
              </div>

              <img
                src={`https://hpoimipfauvvgcjqrnso.supabase.co/storage/v1/object/public/images/charmed/Charmed.jpg`}
                alt="Inspire"
                className="h-[350px] w-full object-contain rounded-lg"
              />
              <div className="flex flex-col items-center px-8 py-4">
                <p className="text-base md:text-xl font-futuraBold text-slate-800">
                  Charmed
                </p>
                <p className=" text-xs text-center font-futuraBook w-full">
                  Follow the magical thread to an inspirational design
                </p>
              </div>
            </div>
          </Link>
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

export default Express;
