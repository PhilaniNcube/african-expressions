import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-zinc-800 px-6 md:px-4">
      <div className="max-w-7xl mx-auto py-12 px-4 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
          <div className="flex flex-col space-y-3 uppercase">
            <Link href="/">
              <a className=" text-xs">Home</a>
            </Link>
            <Link href="/about">
              <a className=" text-xs">About Us</a>
            </Link>
            <Link href="/yarns">
              <a className=" text-xs">Our Yarns</a>
            </Link>
            <Link href="/express">
              <a className=" text-xs">Express Yourself</a>
            </Link>
            <Link href="/patterns">
              <a className=" text-xs">Patterns</a>
            </Link>
            <Link href="/stores">
              <a className=" text-xs">Stores</a>
            </Link>
            <Link href="/contact">
              <a className=" text-xs">Get In Touch</a>
            </Link>
          </div>

          <div className="uppercase text-white">
            <h2 className=" text-sm font-futuraBold">Our Yarns</h2>
            <div className="grid text-xs grid-cols-2 gap-4 mt-3">
              <Link href="/yarns/adore">Adore</Link>
              <Link href="/yarns/joy">Joy</Link>
              <Link href="/yarns/comfort">comfort</Link>
              <Link href="/yarns/love">love</Link>
              <Link href="/yarns/curiosity">curiosity</Link>
              <Link href="/yarns/soul">soul</Link>
              <Link href="/yarns/freedom">freedom</Link>
              <Link href="/yarns/enchanted">enchanted</Link>
              <Link href="/yarns/harmony">harmony</Link>
              <Link href="/yarns/inspire">inspire</Link>
              <Link href="/yarns/hope">hope</Link>
              <Link href="/yarns/desire">desire</Link>
            </div>
          </div>

          <div className="text-white text-sm uppercase flex flex-col space-y-4">
            <Link href="/contact" passHref>
              <h2 className="text-md font-futuraBold cursor-pointer">
                Contact Us
              </h2>
            </Link>
            <a href="tel:+27414862430">+27(0)41 486 2430</a>
            <a href="tel:+27823275086">+27(0)82 327 5086</a>
            <a href="emailto:info@africanexpressions.co.za">
              info@africanexpressions.co.za
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
