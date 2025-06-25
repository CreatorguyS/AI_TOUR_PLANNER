import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './component/UserTripCardItem';

const Mytrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  const GetUserTrips = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'AItrips'),
      where('userEmail', '==', user.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]); // clear before setting

    querySnapshot.forEach((doc) => {
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  }, [navigate]); // add 'navigate' as a dependency

  useEffect(() => {
    GetUserTrips();
  }, [GetUserTrips]); // ✅ now it's safe to include

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {
          userTrips?.length > 0 ? (
            userTrips.map((trip, index) => (
              <UserTripCardItem key={index} trip={trip} />
            ))
          ) : (
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={index} className='h-[300px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Mytrips;
