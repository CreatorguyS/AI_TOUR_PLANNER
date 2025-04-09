import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4 text-white">Places to Visit</h2>

      <div className="space-y-8">
        {trip.tripData?.itinerary.map((dayPlan, index) => (
          <div key={index}>
            <h3 className="font-medium text-xl text-white mb-3">Day {dayPlan.day}</h3>
            {/* Responsive grid for places */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dayPlan.dailyPlan.map((place, idx) => (
                <div key={idx}>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
