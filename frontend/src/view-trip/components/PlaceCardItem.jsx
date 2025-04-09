import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
function PlaceCardItem({ place }) {
   const [photoUrl,setPhotoUrl]=useState()
  //  console.log("place",place)
    useEffect
      useEffect(()=>{
       place&& GetPlacePhoto()
      },[place]);
      const GetPlacePhoto=async()=>{
      const data={
        textQuery:place?.placeName
      }
      await GetPlaceDetails(data).then(resp=>{
  const Photo=PHOTO_REF_URL
  .replace('NAME',resp.data.places[0].photos[3].name)
  setPhotoUrl(Photo);
  // console.log("PhotoUrl is ",photoUrl);
  })
    }
  return (
    <Link to={`https://maps.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
    target='_blank'>
    <div className=" shadow-md flex border gap-5 rounded-xl p-5 items-center bg-zinc-900 text-white hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src={photoUrl?photoUrl:'/logo.svg'}
        alt={place.placeName}
        className="w-[130px] h-[100px] rounded-xl "
      />
      <div>
        <h2 className="font-bold text-lg">{place.placeName}</h2>
        <p className="text-sm text-gray-400">{place.placeDetails}</p>

<h2 className="text-sm text-gray-300 mt-2">🕥 {place.travelTimeFromPrevious}</h2>
<Button size='sm'><FaMapLocationDot /></Button>
      </div>
    </div>
    </Link>
  );
}

export default PlaceCardItem;