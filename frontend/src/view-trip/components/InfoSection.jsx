import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MdOutlineShare } from "react-icons/md";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.split(',')[0],
    };

    try {
      const resp = await GetPlaceDetails(data);
      const photoName = resp.data?.places?.[0]?.photos?.[3]?.name;

      if (photoName) {
        const photo = PHOTO_REF_URL.replace('NAME', photoName);
        setPhotoUrl(photo);
        // console.log("PhotoUrl is ", photo);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  return (
    <div>
      <img
        className='h-[px] w-full object-cover rounded'
        src={photoUrl}
        alt="Destination"
      />
      <div className='flex justify-between items-center gap-5'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        </div>
        <div className='my-5 flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md'>
            📅 {trip?.userSelection?.noofdays} Days
          </h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md'>
            💰 {trip?.userSelection?.budget} Budget
          </h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md'>
            🥂 No. of Travelers: {trip?.userSelection?.traveler}
          </h2>
        </div>
        <Button><MdOutlineShare /></Button>
      </div>
    </div>
  );
};

export default InfoSection;
