/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  

  return (
    <div className="relative isolate">
      <Image
        src="/images/hero.jpeg"
        alt="hero"
        priority
        quality={75}
        className="object-cover w-full aspect-video"
        height={6000}
        width={4000}
      />
      <div className="absolute inset-0">
        <div className="flex flex-col items-center justify-center h-full py-6 mx-auto my-auto max-w-7xl lg:-translate-y-16">
          <h1 className="text-2xl text-center text-white font-georgiaBold md:text-4xl lg:text-6xl ">
            Yarns that inspire
          </h1>

          <div className="hidden grid-cols-3 gap-4 mt-12 md:grid lg:gap-12">
            <Link href="/yarns" className="flex flex-col items-center justify-center w-64 h-64 text-white transition-colors duration-150 ease-out rounded-lg shadow-xl cursor-pointer bg-accent/60 hover:bg-accent hover:shadow-md">
              <img src="/images/Icons-03.svg" alt="" className="w-24 h-24" />
              <p className="text-xl">Browse Our Yarns</p>
            </Link>
            <Link href='/patterns'
              className="flex flex-col items-center justify-center w-64 h-64 text-white transition-colors duration-150 ease-out rounded-lg shadow-xl cursor-pointer bg-accent/60 hover:bg-accent hover:shadow-md"
            >
              <img src="/images/Icons-02.svg" alt="" className="w-24 h-24" />
              <p className="text-xl">Browse Patterns</p>
            </Link>
            <Link href="/tutorials"
              className="flex flex-col items-center justify-center w-64 h-64 text-white transition-colors duration-150 ease-out rounded-lg shadow-xl cursor-pointer bg-accent/60 hover:bg-accent hover:shadow-md"
            >
              <img src="/images/Icons-01.svg" alt="" className="w-24 h-24" />
              <p className="text-xl">Tutorials</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
