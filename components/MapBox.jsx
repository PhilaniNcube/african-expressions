import {useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Map, {Marker} from 'react-map-gl'



const MapBox = ({stores}) => {

  const mapRef = useRef(null)
  const [viewport, setViewport] = useState({
    latitude: -26,
    longitude: 33,
    zoom: 10,
  });



  return (
    <div className="text-black relative bg-blue-400">

    </div>
  );
};
export default MapBox;
