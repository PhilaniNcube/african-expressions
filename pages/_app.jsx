import { Fragment, useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import ContactButton from '../components/layout/ContactButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navbar />
          <ContactButton />
          <Component {...pageProps} />
          <Footer />
        </Hydrate>

      </QueryClientProvider>
    </Fragment>
  );
}

