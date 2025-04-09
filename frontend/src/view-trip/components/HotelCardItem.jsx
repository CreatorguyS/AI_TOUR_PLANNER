import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
const HotelCardItem = ({ hotel }) => {
  const [photoUrl,setPhotoUrl]=useState()
  useEffect
    useEffect(()=>{
     hotel&& GetPlacePhoto()
    },[hotel]);
    const GetPlacePhoto=async()=>{
    const data={
      textQuery:hotel?.hotelName
    }
    await GetPlaceDetails(data).then(resp=>{
const Photo=PHOTO_REF_URL
.replace('NAME',resp.data.places[0].photos[3].name)
setPhotoUrl(Photo);
console.log("PhotoUrl is ",Photo);
})
  }
  return (
    <Link
      to={`https://maps.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.hotelName + " " + hotel.address
      )}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img src={photoUrl} alt="Hotel" className="rounded-xl" />
        <div className="my-3">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
          <h2 className="text-xs text-gray-500">💰 {hotel.priceEstimate}</h2>
          <h2 className="text-xs text-gray-500">⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
