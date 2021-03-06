import Head from 'next/head';
import Image from 'next/image';

import { Fragment } from 'react';
import Hero from '../components/Hero';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Home | African Expressions</title>
      </Head>
      <Hero />
      <SectionOne />
      <SectionTwo />
    </Fragment>
  );
}
