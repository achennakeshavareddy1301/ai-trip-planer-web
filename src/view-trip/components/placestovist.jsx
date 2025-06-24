import React from 'react';
import { motion } from 'framer-motion';

const PlacesToVisit = ({ trip }) => {
  const days = trip?.tripData?.daily_itinerary || [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.h2 
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="block text-xl text-gray-500 font-normal mb-2">Your AI-Powered Itinerary</span>
        Places to Explore
      </motion.h2>

      {/* Desktop: Professional timeline layout */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Sophisticated timeline */}
          <div className="absolute left-1/2 top-16 bottom-16 w-0.5 bg-gradient-to-b from-[#f56551] to-gray-300 transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-3 gap-8">
            {days.map((day, idx) => (
              <motion.div 
                key={idx}
                className={`relative ${idx % 2 === 0 ? 'mt-0' : 'mt-12'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Timeline marker */}
                <div className="absolute -left-7 top-8 w-4 h-4 rounded-full bg-[#f56551] border-4 border-white shadow-md"></div>
                
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-full transition-all duration-300 hover:shadow-2xl">
                  <div className="p-6">
                    <div className="flex items-start mb-5">
                      <div className="bg-gradient-to-br from-[#f56551] to-orange-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{day.theme}</h3>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                        <span className="mr-2">Activities</span>
                        <div className="flex-1 ml-2 border-b border-gray-200"></div>
                      </h4>
                      <ul className="space-y-4">
                        {day.activities.map((activity, i) => (
                          <motion.li 
                            key={i}
                            className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#f56551]/30 transition-colors"
                            whileHover={{ translateX: 5 }}
                          >
                            <div className="font-semibold text-gray-800 text-lg">{activity.name}</div>
                            <div className="text-gray-600 mt-2">{activity.description}</div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-3">
                              <div className="bg-gray-100 rounded-lg p-2 text-center">⏱️ {activity.duration}</div>
                              <div className="bg-gray-100 rounded-lg p-2 text-center">💰 {activity.cost_estimate}</div>
                              <div className="bg-gray-100 rounded-lg p-2 text-center">🚗 {activity.transport_time_to_next}</div>
                            </div>
                            {activity.booking_link && activity.booking_link !== "N/A" && (
                              <a
                                href={activity.booking_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center text-[#f56551] font-medium hover:underline"
                              >
                                Book Experience
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            )}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-5 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                        <span className="mr-2">Dining</span>
                        <div className="flex-1 ml-2 border-b border-gray-200"></div>
                      </h4>
                      <ul className="space-y-3">
                        {day.dining_recommendations?.map((dine, j) => (
                          <li key={j} className="flex items-start py-2">
                            <span className="font-semibold text-gray-800 min-w-[80px]">{dine.meal_type}:</span>
                            <div className="pl-2 border-l border-gray-200">
                              <div className="font-medium text-gray-800">{dine.name}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {dine.cuisine} • {dine.budget_indicator}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Premium stacked experience */}
      <div className="md:hidden space-y-8">
        {days.map((day, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start mb-5">
                <div className="bg-gradient-to-br from-[#f56551] to-orange-500 text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{day.theme}</h3>
                  <p className="text-gray-500 text-sm mt-1">{day.date}</p>
                </div>
              </div>
              
              <div className="mb-5">
                <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Activities</h4>
                <ul className="space-y-4">
                  {day.activities.map((activity, i) => (
                    <li key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="font-semibold text-gray-800 text-lg">{activity.name}</div>
                      <div className="text-gray-600 mt-2">{activity.description}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-3">
                        <div className="bg-gray-100 rounded-lg p-2 text-center">⏱️ {activity.duration}</div>
                        <div className="bg-gray-100 rounded-lg p-2 text-center">💰 {activity.cost_estimate}</div>
                        <div className="bg-gray-100 rounded-lg p-2 text-center">🚗 {activity.transport_time_to_next}</div>
                      </div>
                      {activity.booking_link && activity.booking_link !== "N/A" && (
                        <a
                          href={activity.booking_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-[#f56551] font-medium hover:underline"
                        >
                          Book Experience
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-5 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">Dining Recommendations</h4>
                <ul className="space-y-3">
                  {day.dining_recommendations?.map((dine, j) => (
                    <li key={j} className="flex items-start py-2">
                      <span className="font-semibold text-gray-800 min-w-[80px]">{dine.meal_type}:</span>
                      <div className="pl-2 border-l border-gray-200">
                        <div className="font-medium text-gray-800">{dine.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {dine.cuisine} • {dine.budget_indicator}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {idx < days.length - 1 && (
              <div className="flex justify-center py-6 bg-gray-50">
                <div className="animate-bounce">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14m0 0l-7-7m7 7l7-7"
                      stroke="#f56551"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
