import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  GoogleMapsMarkerClusterer,
} from "@react-google-maps/api";


const MapComponent = ({ stores }) => {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  const [selected, setSelected] = useState(stores[0])

  console.log({selected})

   const [filter, setFilter] = useState("");

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      libraries: ["places"],
    });

     const mapRef = useRef();
     const [office, setOffice] = useState();

      const center = useMemo(() => ({ lat: -34.0340047, lng: 18.4620655 }), []);

        const options = useMemo(
          () => ({
            mapId: "17c68adb37540aef",
            disableDefaultUI: true,
            clickableIcons: false,
            styles: "greyscale",
          }),
          []
        );

        const [mapCenter, setMapCenter] = useState({
          lat: -34.0340047,
          lng: 18.4620655,
        });

        const onLoad = useCallback((map) => (mapRef.current = map), []);

         const onUnmount = useCallback(function callback(map) {
           mapRef.current = null;
         }, []);

    const [viewState, setViewState] = useState({
      latitude: -34.0197417,
      longitude: 18.4859964,
      zoom: 11,
    });


      const filteredStores = useMemo(
        () =>
          stores.filter(
            (store) =>
              store.name.toLowerCase().includes(filter.toLowerCase()) ||
              store.city.toLowerCase().includes(filter.toLowerCase()) ||
              store.streetAddress.toLowerCase().includes(filter.toLowerCase())
          ),
        [filter, stores]
      );

      console.log(filteredStores)

     if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-screen mb-16">
      <div className="w-fit lg:w-1/3 h-full  py-6">
        <h1 className="font-medium font-georgiaBold text-accent text-2xl lg:text-3xl">
          Store List
        </h1>

        <div className="flex flex-col ">
          <div className="relative">
            <div className="absolute text-deep flex items-center pl-3 h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx={10} cy={10} r={7} />
                <line x1={21} y1={21} x2={15} y2={15} />
              </svg>
            </div>
            <input
              id="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-deep bg-white  focus:outline-none focus:border focus:border-gray-700 font-normal pr-20 sm:pr-32 h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
              placeholder="Search for Stores"
            />
          </div>
        </div>

        <div className="border-t-2 p-2 mt-3 border-accent h-full overflow-y-scroll grid gap-4">
          {filteredStores.map((store) => (
            <div
              onClick={() => {
              if(store.lat === null || store.long === null ) {
                 alert("We do not have the coordnates for this store");
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
              key={store.id}
              className="bg-slate-200 hover:bg-slate-300 transition-all duration-200 cursor-pointer rounded-xl shadow-lg  w-full p-4"
            >
              <h3 className="font-georgiaBold text-xl text-accent">
                {store.name}
              </h3>
              <p>{store.website ? `${store.website}` : "n/a"}</p>
              <p className="text-xs">{store.streetAddress}</p>
              <p className="text-sm">{store.city}</p>
              <p className="text-sm">{store.contact}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex-1">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {stores.map((store) => (
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
              <Circle center={office} radius={15000} options={closeOptions} />
            </Fragment>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};
export default MapComponent;


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
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
