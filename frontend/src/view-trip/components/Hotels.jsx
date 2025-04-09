import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  // console.log("trip is ", trip);

  if (!trip || !trip.tripData || !trip.tripData.hotelOptions) {
    return (
      <p className='text-gray-500 italic mt-4'>
        Loading hotels...
      </p>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>
        Hotels Recommendation
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip.tripData.hotelOptions.map((hotel) => (
        <HotelCardItem hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
