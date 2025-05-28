// app/travel-form/steps/Step5.tsx
'use client';
import { useFormData } from '../form-context';
import { useState } from 'react';
import axios from 'axios';

interface Step5Props {
  prev: () => void;
}

export default function Step5({ prev }: Step5Props) {
  const { formData } = useFormData();
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async () => {
    try {
      // Check if userId exists before submitting
      if (!formData.userId) {
        console.warn("No userId found in form data, using fallback method");
        // Try to get it directly from cookies as a fallback
        const userId = document.cookie
          .split('; ')
          .find(row => row.startsWith('userId='))
          ?.split('=')[1];
          
        if (userId) {
          formData.userId = userId;
          console.log("Retrieved userId from cookies:", userId);
        }
      }
      
      // Submit the form data
      console.log('Submitting form data:', formData);
      const response = await axios.post("/api/book-trip", formData);
      console.log("API response:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert('Submission failed. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#2e4369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="mb-6">Your travel request has been submitted successfully.</p>
        <p className="text-sm text-blue-100">You will receive a confirmation email shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
      <p className="mb-6 text-blue-100">Please review your details before submitting</p>
      
      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm space-y-4">
        {formData.userId && (
          <div className="flex justify-between">
            <span className="text-blue-100">User ID:</span>
            <span className="font-medium">{formData.userId}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-blue-100">Name:</span>
          <span className="font-medium">{formData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Start Location:</span>
          <span className="font-medium">{formData.startLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">End Location:</span>
          <span className="font-medium">{formData.endLocation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Start Date:</span>
          <span className="font-medium">{formData.startDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">End Date:</span>
          <span className="font-medium">{formData.endDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Passengers:</span>
          <span className="font-medium">{formData.passengers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-100">Need Assistance:</span>
          <span className="font-medium">{formData.travelAssistance ? "Yes" : "No"}</span>
        </div>
      </div>

      <div className="mt-8 flex space-x-3">
        <button 
          type="button"
          onClick={prev} 
          className="px-6 py-3 bg-[#1a2a45] text-white font-medium rounded-lg shadow transition-all hover:bg-[#253a5f] focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Back
        </button>
        
        <button 
          type="button"
          onClick={handleSubmit} 
          className="flex-1 px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Booking
        </button>
      </div>
    </div>
  );
}
