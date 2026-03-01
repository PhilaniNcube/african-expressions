import {useRef, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Map, {Marker} from 'react-map-gl'
import { Store } from '@/types';



const MapBox = ({stores}:{stores: Store[]}) => {

  const mapRef = useRef(null)
  const [viewport, setViewport] = useState({
    latitude: -26,
    longitude: 33,
    zoom: 10,
  });



  return (
    <div className="relative text-black bg-blue-400">

    </div>
  );
};
export default MapBox;
