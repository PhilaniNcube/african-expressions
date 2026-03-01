import { Fragment } from 'react';
import type { Metadata } from 'next';
import Hero from '../components/Hero';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';

export const metadata: Metadata = {
  title: 'Home | African Expressions',
};

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <SectionOne />
      <SectionTwo />
    </Fragment>
  );
}
