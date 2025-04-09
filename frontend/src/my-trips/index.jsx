import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './component/UserTripCardItem';

const Mytrips = () => {
  const navigate = useNavigate();
const [userTrips,setUserTrips]=useState([])
  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // ✅ fix here

    if (!user) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'AItrips'),
      where('userEmail', '==', user.email)
    );
//  console.log("usertrips",userTrips)
    const querySnapshot = await getDocs(q);
    setUserTrips([])
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className="font-bold text-3xl">My Trips</h2>
      {/* Trip listing logic goes here */}
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
      {userTrips?.length>0?userTrips.map((trip, index) => {
  return <UserTripCardItem key={index} trip={trip} />;
})
:[1,2,3,4,5,6].map((item,index)=>{
    <div key={index} className='h-[300px] w-full bg-slate-200 animate-pulse rounded-xl'>


    </div>
})
}

      </div>
    </div>
  );
};

export default Mytrips;
