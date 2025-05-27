'use client';
import { useFormData } from '../form-context';
import { useState } from 'react';

interface Step3Props {
  next: () => void;
  prev: () => void;
}

export default function Step3({ next, prev }: Step3Props) {
  const { formData, updateForm } = useFormData();
  const [passengers, setPassengers] = useState<number>(formData.passengers || 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setPassengers(value);
    } else if (e.target.value === '') {
      setPassengers(1); // Default to 1 if empty
    }
  };

  const handleNext = () => {
    if (passengers < 1) {
      alert('Please enter a valid number of passengers (at least 1)');
      return;
    }
    updateForm({ passengers });
    next();
  };

  const handlePrev = () => {
    updateForm({ passengers });
    prev();
  };

  return (
    <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Guests</h2>
      <p className="mb-6 text-blue-100">Enter the number of passengers for your trip</p>
      
      <div className="space-y-5">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <label className="block mb-2 font-medium text-blue-50">Number of Passengers</label>
          <input
            type="number"
            min={1}
            name="passengers"
            value={passengers}
            onChange={handleChange}
            placeholder="Enter number of passengers"
            className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90"
            aria-label="Number of Passengers"
          />
          
          <p className="mt-4 text-sm text-blue-100">
            Please indicate the total number of passengers that will be traveling. 
            This helps us prepare accommodations and transportation arrangements.
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
