import React from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function PlaceCardItem({ place }) {
  return (
    <Link to={`https://maps.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
    target='_blank'>
    <div className=" shadow-md flex border gap-5 rounded-xl p-5 items-center bg-zinc-900 text-white hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src="/travel.jpg"
        alt={place.placeName}
        className="w-[130px] h-[100px] rounded-xl "
      />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.details}</p>

<h2 className="text-sm text-gray-300 mt-2">🕥 {place.travelTimeFromPrevious}</h2>
<Button size='sm'><FaMapLocationDot /></Button>
      </div>
    </div>
    </Link>
  );
}

export default PlaceCardItem;