// app/travel-form/steps/Step1.tsx
'use client';
import { useFormData } from '../form-context';
import { useState } from 'react';

// Step1Props defines the props for the Step1 component
interface Step1Props {
  next: () => void; 
  prev: () => void;
}

// Step1 component for entering user travel details
export default function Step1({ next }: Step1Props) {
  const { formData, updateForm } = useFormData();
  // Local state for form fields
  const [localData, setLocalData] = useState({
    name: formData.name || '',
    startLocation: formData.startLocation || '',
    endLocation: formData.endLocation || '',
  });

  // Handle input changes and update local state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  // Handle next button click: update global form and go to next step
  const handleNext = () => {
    updateForm(localData);
    next();
  };

  return (
    <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Your Details</h2>
      <p className="mb-6 text-blue-100">Please provide your travel information</p>
      
      <div className="space-y-5">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm space-y-5">
          <div>
            <label className="block mb-2 font-medium text-blue-50">Name</label>
            <input
              type="text"
              name="name" 
              value={localData.name} 
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90" 
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-blue-50">Start Location</label>
            <input
              type="text"
              name="startLocation" 
              value={localData.startLocation} 
              onChange={handleChange}
              placeholder="Enter start location"
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90" 
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-blue-50">End Location</label>
            <input
              type="text"
              name="endLocation" 
              value={localData.endLocation} 
              onChange={handleChange}
              placeholder="Enter end location"
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90" 
            />
          </div>
        </div>

        <div className="mt-8">
          <button 
            type="button"
            onClick={handleNext} 
            className="w-full px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Continue to Travel Dates
          </button>
        </div>
      </div>
    </div>
  );
}
