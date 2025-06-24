import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className="text-xl font-bold mt-2">Accommodation Options</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                {trip?.tripData?.practical_info?.accommodation_options?.map((item, index) => (
                    <Link to={`https://www.google.com/maps/search/?api=1&query=`+item.name+item.address} key={index} target="_blank" >
                    <div key={index} className="border-b py-4">
                        <img
                            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
                            alt="Hotel"
                            className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-600">{item.type}</p>
                            <p className="text-gray-800 font-bold">Price: ₹{item.price_range}</p>
                            <p className="text-gray-500">📍{item.address}</p>


                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels
