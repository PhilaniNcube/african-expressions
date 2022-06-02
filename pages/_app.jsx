import { Fragment, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ContactButton from '../components/layout/ContactButton';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Fragment>
  );
}

export default MyApp;
