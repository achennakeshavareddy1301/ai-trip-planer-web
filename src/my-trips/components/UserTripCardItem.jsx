import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      // Check if photos exist and use the first photo if available
      const photos = resp?.data?.places?.[0]?.photos;
      if (photos && photos.length > 0) {
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[0].name);
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(null);
      }
    }).catch(() => setPhotoUrl(null));
  }

  // Extract destination for display
  const destination = trip?.userSelection?.destination;

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className='hover:scale-105 transition-all border rounded-xl p-3 bg-white shadow-md'>
        {/* Only show image if available */}
        {photoUrl ? (
          <img src={photoUrl} alt={destination} className='object-cover rounded-xl h-[220px] w-full mb-3' />
        ) : (
          <div className='flex items-center justify-center h-[220px] w-full bg-gray-100 rounded-xl mb-3 text-gray-400 text-lg font-semibold'>
            No Image Available
          </div>
        )}
        <div>
          <h2 className='font-bold text-lg mb-1'>{destination}</h2>
          <h2 className='text-sm text-gray-500 mb-1'>
            {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget.
          </h2>
          {/* Show destination explicitly */}
          <div className='text-xs text-gray-600'>
            Destination: <span className='font-medium'>{trip?.userSelection?.destination}</span>
          </div>
        </div>
      </div>
    </Link >
  )
}

export default UserTripCardItem;
