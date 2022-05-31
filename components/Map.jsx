import React, { useState, useMemo, useCallback, useRef, Fragment } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  GoogleMapsMarkerClusterer,
} from '@react-google-maps/api';
import Places from './Places';
import Distance from './Distance';
import getStores from '../lib/getStores';
import { useQuery } from 'react-query';

const Map = () => {
  const mapRef = useRef();

  const [office, setOffice] = useState();

  const center = useMemo(() => ({ lat: -34.0340047, lng: 18.4620655 }), []);
  const options = useMemo(
    () => ({
      mapId: '17c68adb37540aef',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const storesQuery = useQuery('stores', getStores, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const stores = storesQuery.data;

  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-6 lg:px-0 w-full my-12">
        <h1 className="text-4xl text-deep font-georgiaBold my-6">Stores</h1>

        <div className="flex flex-col my-4">
          <Places
            setOffice={(position) => {
              setOffice(position);
              mapRef.current?.panTo(position);
            }}
          />
        </div>

        <div className="flex h-[70vh] shadow-lg shadow-black/40">
          <div className="w-[40%] bg-slate-100 h-full px-4 py-6 overflow-y-scroll flex flex-col space-y-6">
            {storesQuery.isLoading && (
              <div className="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
                <div className="h-48 rounded-t dark:bg-gray-700"></div>
                <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
                  <div className="w-full h-6 rounded dark:bg-gray-700"></div>
                  <div className="w-full h-6 rounded dark:bg-gray-700"></div>
                  <div className="w-3/4 h-6 rounded dark:bg-gray-700"></div>
                </div>
              </div>
            )}

            {storesQuery.isSuccess
              ? stores.map((store) => (
                  <div
                    key={store.id}
                    className="w-full rounded-lg shadow-lg cursor-pointer shadow-slate-700/30 bg-slate-50 p-4"
                    onClick={() => {
                      if (store.lat === null || store.long === null) {
                        alert('We do not have the coordnates for this store');
                        return;
                      } else {
                        setOffice({
                          lat: parseFloat(store.lat),
                          lng: parseFloat(store.long),
                        });
                        mapRef.current?.panTo({
                          lat: parseFloat(store.lat),
                          lng: parseFloat(store.long),
                        });
                      }
                    }}
                  >
                    <h2 className="text-lg text-accent font-futuraBold">
                      {store.name}
                    </h2>

                    <p className="text-base text-deep">{store.streetAddress}</p>
                    <p className="text-sm text-gray-500">
                      Contact Number: {store.contact}
                    </p>
                  </div>
                ))
              : null}
          </div>
          <div className="flex-1 h-full bg-slate-100">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="map-container"
              options={options}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {storesQuery.isSuccess &&
                stores.map((store) => (
                  <Marker
                    key={store.id}
                    position={{
                      lat: parseFloat(store.lat),
                      lng: parseFloat(store.long),
                    }}
                  />
                ))}

              {office && (
                <Fragment>
                  <Marker position={office} />
                  <Circle
                    center={office}
                    radius={15000}
                    options={closeOptions}
                  />
                </Fragment>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  visible: true,
};

const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};
