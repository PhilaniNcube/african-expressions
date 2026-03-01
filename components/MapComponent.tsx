"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Store } from "@/types";

const MapComponent = ({ stores }: { stores: Store[] }) => {
  const [filter, setFilter] = useState("");
  const [office, setOffice] = useState<google.maps.LatLngLiteral | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const officeMarkerRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (!mapContainerRef.current) return;

      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: -34.0340047, lng: 18.4620655 },
        zoom: 10,
        mapId: "17c68adb37540aef",
        disableDefaultUI: true,
        clickableIcons: false,
      });

      mapRef.current = map;
      setIsLoaded(true);
    });
  }, []);

  // Update markers whenever stores or isLoaded changes
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    stores.forEach((store) => {
      if (store.lat === null || store.long === null) return;
      const marker = new google.maps.Marker({
        position: { lat: store.lat, lng: store.long },
        map: mapRef.current!,
        title: store.name,
      });
      markersRef.current.push(marker);
    });
  }, [isLoaded, stores]);

  // Update office marker and circle when office changes
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !office) return;

    officeMarkerRef.current?.setMap(null);
    circleRef.current?.setMap(null);

    officeMarkerRef.current = new google.maps.Marker({
      position: office,
      map: mapRef.current,
    });

    circleRef.current = new google.maps.Circle({
      center: office,
      radius: 15000,
      map: mapRef.current,
      strokeOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      visible: true,
      zIndex: 3,
      fillOpacity: 0.05,
      strokeColor: "#8BC34A",
      fillColor: "#8BC34A",
    });
  }, [isLoaded, office]);

  const filteredStores = useMemo(
    () =>
      stores.filter(
        (store) =>
          (store.name ?? "").toLowerCase().includes(filter.toLowerCase()) ||
          (store.city ?? "").toLowerCase().includes(filter.toLowerCase()) ||
          (store.streetAddress ?? "").toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, stores]
  );

  const handleStoreClick = useCallback(
    (store: Store) => {
      if (store.lat === null || store.long === null) {
        alert("We do not have the coordinates for this store");
        return;
      }
      const pos = { lat: store.lat, lng: store.long };
      setOffice(pos);
      mapRef.current?.panTo(pos);
    },
    []
  );

  return (
    <div className="flex flex-col h-screen px-4 mb-16 lg:flex-row">
      <div className="h-full py-6 w-fit lg:w-1/3">
        <h1 className="text-2xl font-medium font-georgiaBold text-accent lg:text-3xl">
          Store List
        </h1>

        <div className="flex flex-col">
          <div className="relative">
            <div className="absolute flex items-center h-full pl-3 text-deep">
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
              className="flex items-center h-10 pl-10 pr-20 text-sm font-normal bg-white border border-gray-300 rounded shadow text-deep focus:outline-none focus:border focus:border-gray-700 sm:pr-32"
              placeholder="Search for Stores"
            />
          </div>
        </div>

        <div className="grid h-full gap-4 p-2 mt-3 overflow-y-scroll border-t-2 border-accent">
          {filteredStores.map((store) => (
            <div
              onClick={() => handleStoreClick(store)}
              key={store.id}
              className="w-full p-4 transition-all duration-200 shadow-lg cursor-pointer bg-slate-200 hover:bg-slate-300 rounded-xl"
            >
              <h3 className="text-xl font-georgiaBold text-accent">
                {store.name}
              </h3>
              <p>{store.website ? `${store.website}` : ""}</p>
              <p className="text-sm">{store.streetAddress}</p>
              <p className="text-sm">{store.city}</p>
              <p className="text-sm">{store.contact}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        {!isLoaded && <div>Loading map...</div>}
        <div ref={mapContainerRef} className="map-container" />
      </div>
    </div>
  );
};

export default MapComponent;
