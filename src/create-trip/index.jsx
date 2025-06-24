import React, { useState } from 'react';
import { Input } from '../components/ui/input.jsx';
import { SelectBudgetOptions } from '../constants/options.jsx';

import { Button  }from '../components/ui/button.jsx';

import { SelectTravelersList } from '../constants/options.jsx';
import { AI_PROMPT } from '../constants/options.jsx';
import main from '../service/Aimodal.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '../service/firebasecongig.jsx';
import { doc, setDoc } from "firebase/firestore";
import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

// Accessibility: reduced motion support via CSS
const reducedMotionCSS = `
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Keyframe for fade-in (feedback)
const fadeInKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px);}
  to { opacity: 1; transform: translateY(0);}
}
`;

// Keyframe for bounce (success)
const bounceKeyframes = `
@keyframes bounce {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-8px);}
}
`;

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [destinationInput, setDestinationInput] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    if (name === 'days') {
      const numValue = Number(value);
      if (numValue < 1 || numValue > 10) return;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDestinationInput = (e) => {
    setDestinationInput(e.target.value);
  };

  const handleDestinationKeyDown = (e) => {
    if (e.target.value.trim() && e.key === 'Enter') {
      handleInputChange('destination', e.target.value.trim());
    }
  };

  const handleDestinationBlur = () => {
    if (destinationInput.trim()) {
      handleInputChange('destination', destinationInput.trim());
    }
  };

  const isFormComplete =
    formData.destination &&
    formData.days &&
    formData.budget &&
    formData.travelers;

  const saveTripToDB = async (tripData) => {
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: typeof tripData === "string" ? JSON.parse(tripData) : tripData,
        userEmail: user?.email,
        id: docId,
      });
      setSaveSuccess(true);
     navigate(`/view-trip/${docId}`);

      return true;
    } catch (error) {
      console.error("Error saving trip: ", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const onGenerateTrip = async () => {
    if (!localStorage.getItem('user')) {
      setOpenDialog(true);
      return;
    }

    if (!isFormComplete) {
      alert('Please fill in all fields before generating the trip.');
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace(/{location}/g, formData.destination)
      .replace(/{days}/g, formData.days)
      .replace(/{budget}/g, formData.budget)
      .replace(/{travelers}/g, formData.travelers);

    try {
      const response = await main(FINAL_PROMPT);
      const saveResult = await saveTripToDB(response);

      if (saveResult) {
        alert('Trip created and saved successfully!');
      } else {
        alert('Trip created but failed to save. Please try again.');
      }
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please try again.');
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.access_token}`,
              Accept: 'application/json',
            }
          }
        );
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    },
    onError: (error) => console.error('Login failed:', error),
  });

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      {/* Animation CSS injected for reduced motion and keyframes */}
      <style>{reducedMotionCSS + fadeInKeyframes + bounceKeyframes}</style>
      <div className="flex items-center gap-2 mb-2">
        <h2 className='font-bold text-2xl'>Tell us your travel preferences</h2>
        <span className="text-2xl">🏕️🌴</span>
        <StarIcon className="h-5 w-5 text-yellow-400" />
      </div>

      <p className='text-gray-600 mt-3 text-lg'>Just provide some basic information to help us plan your trip.</p>

      <div className='mt-8 flex flex-col gap-8'>
        {/* Destination Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className='font-medium mb-4 text-xl'>What is your destination?</h2>
          <Input
            type='text'
            placeholder='Enter your destination'
            value={destinationInput}
            onChange={handleDestinationInput}
            onKeyDown={handleDestinationKeyDown}
            onBlur={handleDestinationBlur}
            className="hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <p className="text-sm text-gray-500 mt-2">
            Press Enter to save your destination.
          </p>
          {formData.destination && (
            <p
              className="text-green-600 text-sm mt-2 flex items-center"
              style={{
                animation: 'fadeIn 0.4s cubic-bezier(0.4,0,0.2,1)'
              }}
            >
              <StarIcon className="h-4 w-4 mr-1" />
              Saved destination: {formData.destination}
            </p>
          )}
        </div>

        {/* Days Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className='font-medium mb-4 text-xl'>How many days are you planning?</h2>
          <Input
            type='number'
            placeholder='Enter number of days'
            value={formData.days || ''}
            min={1}
            max={10}
            onChange={(e) => handleInputChange('days', e.target.value)}
            className="hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <p className="text-sm text-gray-500 mt-2">
            (Between 1 and 10 days)
          </p>
        </div>

        {/* Budget Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className='font-medium mb-4 text-xl'>What is your budget?</h2>
          <p className="text-gray-600 mb-4">You can provide a rough estimate of your budget for the trip.</p>
          <div className='grid grid-cols-3 gap-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all duration-300 ease-in-out cursor-pointer will-change-transform
                  ${formData.budget === item.title ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-200'}
                  ${hoveredCard === `budget-${index}` ? 'shadow-lg scale-[1.03]' : ''}`}
                onClick={() => handleInputChange('budget', item.title)}
                onMouseEnter={() => setHoveredCard(`budget-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                aria-label={item.title}
              >
                <div className="flex items-center gap-2">
                  <span className='text-2xl'>{item.icon}</span>
                  {formData.budget === item.title && (
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
                <p className='text-gray-600 text-sm mt-1'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className='font-medium mb-4 text-xl'>How many people are traveling?</h2>
          <p className="text-gray-600 mb-4">Let us know the number of people traveling with you.</p>
          <div className='grid grid-cols-3 gap-4'>
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg transition-all duration-300 ease-in-out cursor-pointer will-change-transform
                  ${formData.travelers === item.people ? 'border-2 border-blue-500 shadow-lg' : 'border-gray-200'}
                  ${hoveredCard === `travelers-${index}` ? 'shadow-lg scale-[1.03]' : ''}`}
                onClick={() => handleInputChange('travelers', item.people)}
                onMouseEnter={() => setHoveredCard(`travelers-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                tabIndex={0}
                aria-label={item.title}
              >
                <div className="flex items-center gap-2">
                  <span className='text-2xl'>{item.icon}</span>
                  {formData.travelers === item.people && (
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
                <p className='text-gray-600 text-sm mt-1'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className='mt-10 mb-10 flex justify-end items-center'>
        <Button
          onClick={onGenerateTrip}
          className='mt-10 px-8 py-4 text-lg flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500'
          disabled={!isFormComplete || saving}
        >
          {saving ? (
            <>
              {/* Animated spinner */}
              <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <StarIcon className="h-5 w-5" />
              Create Trip
            </>
          )}
        </Button>

        {/* Feedback animation for save success */}
        {saveSuccess && (
          <span
            className="ml-4 text-green-600 flex items-center"
            style={{
              animation: 'bounce 0.7s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            <StarIcon className="h-5 w-5 mr-1 text-yellow-400" />
            Trip saved to database!
          </span>
        )}
      </div>

      {/* Login Dialog with animated modal transition */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-lg transition-opacity duration-300 ease-in-out">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <StarIcon className="h-12 w-12 text-yellow-400" />
            </div>
            <DialogTitle className="text-center">Login Required</DialogTitle>
            <DialogDescription className="text-center">
              Please log in to save your trip. You need to be signed in to continue.
              <Button 
                onClick={login} 
                className='w-full mt-5 py-4 text-lg flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300'
              >
                <img src="/google.svg" alt="Google" className="h-6 w-6" />
                Log In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
