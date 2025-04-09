import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MdOutlineShare } from "react-icons/md";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

const InfoSection = ({trip}) => {
  console.log("trip is ",trip)
const [photoUrl,setPhotoUrl]=useState()
    useEffect(()=>{
     trip&& GetPlacePhoto()
    },[trip]);
    const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location.split(',')[0]
    }
    await GetPlaceDetails(data).then(resp=>{
const Photo=PHOTO_REF_URL
.replace('NAME',resp.data.places[0].photos[3].name)
setPhotoUrl(Photo);
console.log("PhotoUrl is ",Photo);
})
  }
  return (
    <div>
        <img className='h-[340px] w-full object-cover rounded'
        src={photoUrl} alt="" />
        <div className='flex jusify-between items-center gap-5'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        </div>
        <div className='my-5 flex  gap-5'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md'>📅 {trip?.userSelection?.noofdays} Days</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-900 text-xs md:text-md' >🥂 NO of travelers:  {trip?.userSelection?.traveler} </h2>
        </div>
        <Button><MdOutlineShare /></Button>
        </div>
    </div>
  )
}

export default InfoSection
