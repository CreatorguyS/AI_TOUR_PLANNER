import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: hotel?.hotelName
    };

    try {
      const resp = await GetPlaceDetails(data);
      const name = resp?.data?.places?.[0]?.photos?.[3]?.name;

      if (name) {
        const photo = PHOTO_REF_URL.replace('NAME', name);
        setPhotoUrl(photo);
      }
    } catch (error) {
      console.error("Failed to fetch hotel photo", error);
    }
  }, [hotel]);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel, GetPlacePhoto]);

  return (
    <Link
      to={`https://maps.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.hotelName + " " + hotel.address
      )}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || '/travel.jpg'}
          alt="Hotel"
          className="rounded-xl h-[200px] w-full object-cover"
        />
        <div className="my-3">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
          <h2 className="text-xs text-gray-500">💰 {hotel?.priceEstimate}</h2>
          <h2 className="text-xs text-gray-500">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
