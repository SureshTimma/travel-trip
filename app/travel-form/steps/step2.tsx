// app/travel-form/steps/Step2.tsx
'use client';
import { useFormData } from '../form-context';
import { useState } from 'react';

interface Step2Props {
  next: () => void;
  prev: () => void;
}

export default function Step2({ next, prev }: Step2Props) {
  const { formData, updateForm } = useFormData();
  const [localData, setLocalData] = useState({
    startDate: formData.startDate || '',
    endDate: formData.endDate || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    updateForm(localData);
    next();
  };

  const handlePrev = () => {
    updateForm(localData);
    prev();
  };

  return (
    <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Travel Dates</h2>
      <p className="mb-6 text-blue-100">Select your preferred travel dates</p>
      
      <div className="space-y-5">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm space-y-5">
          <div>
            <label className="block mb-2 font-medium text-blue-50">Start Date</label>
            <input
              type="date"
              name="startDate" 
              value={localData.startDate} 
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90"
              aria-label="Start Date"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-blue-50">End Date</label>
            <input
              type="date"
              name="endDate" 
              value={localData.endDate} 
              onChange={handleChange}
              className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90"
              aria-label="End Date"
            />
          </div>
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
