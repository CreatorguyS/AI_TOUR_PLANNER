import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = useCallback(async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.split(',')[0],
    };

    try {
      const resp = await GetPlaceDetails(data);
      const photoName = resp.data?.places?.[0]?.photos?.[3]?.name;

      if (photoName) {
        const photo = PHOTO_REF_URL.replace('NAME', photoName);
        setPhotoUrl(photo);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  }, [trip]);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip, GetPlacePhoto]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all '>
        <img
          src={photoUrl}
          className='object-cover rounded-full h-[250px]'
          alt="trip"
        />
        <div>
          <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location}
          </h2>
          <h2 className='text-sm text-gray-900'>
            {trip?.userSelection?.noofdays} Days trip with {trip.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
