'use client';
import { useFormData } from '../form-context';
import { useState } from 'react';

interface Step4Props {
  next: () => void;
  prev: () => void;
}

export default function Step4({ next, prev }: Step4Props) {
  const { formData, updateForm } = useFormData();
  const [travelAssistance, setTravelAssistance] = useState(formData.travelAssistance || false);
  
  const handleNext = () => {
    updateForm({ travelAssistance });
    next();
  };
  
  const handlePrev = () => {
    updateForm({ travelAssistance });
    prev();
  };

  return (
    <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Travel Assistance</h2>
      <p className="mb-6 text-blue-100">Let us know if you need any special assistance</p>
      
      <div className="space-y-5">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="assistance"
              checked={travelAssistance}
              onChange={(e) => setTravelAssistance(e.target.checked)}
              className="w-5 h-5 accent-[#2e4369]"
            />
            <label htmlFor="assistance" className="text-lg text-white">
              I require special travel assistance
            </label>
          </div>
          
          <p className="mt-4 text-sm text-blue-100">
            Select this option if you need wheelchair access, dietary accommodations, 
            or any other special assistance during your trip.
          </p>
        </div>

        <div className="mt-8 flex space-x-3">
          <button 
            type="button"
            onClick={handlePrev} 
            className="px-6 py-3 bg-[#1a2a45] text-white font-medium rounded-lg shadow transition-all hover:bg-[#253a5f] focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Back
          </button>
          
          <button 
            type="button"
            onClick={handleNext} 
            className="flex-1 px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
