import React from 'react'
import { Button } from '@/components/ui/button'
import { MdOutlineShare } from "react-icons/md";
const InfoSection = ({trip}) => {
  console.log("trip is ",trip)
  return (
    <div>
        <img className='h-[340px] w-full object-cover rounded'
        src="/travel.jpg" alt="" />
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
