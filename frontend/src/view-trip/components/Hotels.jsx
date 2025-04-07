import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  console.log("trip is ", trip);

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
        {trip.tripData.hotelOptions.map((hotel, index) => (
          <Link
            key={index}
            to={`https://maps.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + " " + hotel.address)}`}
            target='_blank'
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img src="/travel.jpg" alt="Hotel" className='rounded-xl' />
              <div className='my-3'>
                <h2 className='font-medium'>{hotel.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel.address}</h2>
                <h2 className='text-xs text-gray-500'>💰 {hotel.priceEstimate}</h2>
                <h2 className='text-xs text-gray-500'>⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
