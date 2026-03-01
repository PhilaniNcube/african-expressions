import '../styles/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactButton from '../components/layout/ContactButton';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'African Expressions',
    template: '%s | African Expressions',
  },
  description: 'African Expressions - Premium yarns from Africa',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <ContactButton />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
