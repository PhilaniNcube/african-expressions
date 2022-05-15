import Head from 'next/head';
import Image from 'next/image';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Home | African Expressions</title>
      </Head>
      <div className="max-w-7xl mx-auto my-4">
        <h1 className="font-georgiaBold text-center text-3xl tracking-wide text-gray-600 md:text-4xl lg:text-6xl">
          Clasically Elegant <br /> & Naturally Soft
        </h1>
      </div>
    </Fragment>
  );
}
