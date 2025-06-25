import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useToast } from "@/hooks/use-toast";
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const Viewtrip = () => {
  const { toast } = useToast();
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  const GetTripData = useCallback(async () => {
    const docRef = doc(db, "AItrips", tripId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTripData(docSnap.data());
    } else {
      toast({
        title: "Error",
        description: "Trip not found",
        variant: "destructive",
      });
    }
  }, [tripId, toast]);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId, GetTripData]);

  if (!tripData || !tripData.tripData) {
    return <p className='text-gray-500 italic mt-4'>Loading...</p>;
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={tripData} />
      <Hotels trip={tripData} />
      <PlacesToVisit trip={tripData} />
      <Footer />
    </div>
  );
};

export default Viewtrip;
