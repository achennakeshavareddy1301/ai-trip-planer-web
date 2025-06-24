import React, { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { IoIosSend } from 'react-icons/io';
import { GetPlaceDetails } from '@/service/GlobalApi';
function InfoSection({ trip }) {
    useEffect(() => {
        if (trip) {
            const GetplacePhoto = async () => {
                const data = {
                    textQuery: trip.userSelection?.destination,
                };
                GetPlaceDetails(data).then(resp => {
                    console.log(resp.data);
                });
            };
            GetplacePhoto();
        }
    }, [trip]);
    return (
        <div>
            <div>
                <img
                    src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
                    alt="Trip"
                    className="w-full h-80 object-cover"
                />
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
                    <h2 className="font-bold text-2xl md:text-3xl">
                        {trip.userSelection?.destination}
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-2xl text-gray-500 whitespace-nowrap">
                            📅 {trip.userSelection?.days} Days Trip
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-2xl text-gray-500 whitespace-nowrap">
                            💰 Budget: ₹{trip.userSelection?.budget}
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-2xl text-gray-500 whitespace-nowrap">
                            🚗 Travelers: {trip.userSelection?.travelers}
                        </h2>
                        <Button className="bg-[#f56551] text-white flex items-center gap-2">
                            <IoIosSend /> Share Trip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
