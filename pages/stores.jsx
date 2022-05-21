import React, { Fragment } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Map from '../components/Map';

const Stores = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Fragment>
      <Map />
    </Fragment>
  );
};

export default Stores;
