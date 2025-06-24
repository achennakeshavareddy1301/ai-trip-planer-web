import React from 'react'
import { useParams } from 'react-router-dom'
import {db} from '../../service/firebasecongig.jsx'
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import{ useState } from 'react';
import InfoSection from '../components/infoSection.jsx';
import Hotels from '../components/hotels.jsx';
import PlacesToVisit from '../components/placestovist.jsx';

function ViewTrip() {
  const { tripid } = useParams();
  const [trip, setTrip] =useState([]);
  const GetTripData = React.useCallback(async () => {
    const docRef = doc(db, 'AITrips', tripid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, [tripid]);

  useEffect(() => {
    tripid && GetTripData();
  }, [tripid, GetTripData]);

  return (
    <div className='p-10 md:px-20 lg:px-40 xl:px-50'>
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
    </div>
  )
}

export default ViewTrip
