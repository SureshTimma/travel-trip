'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

// Define form data type
type FormData = {
  userId: string;
  name: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  passengers: number;
  travelAssistance: boolean;
};

export default function TravelFormPage() {
  // Single state to handle all form data
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    name: "",
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    passengers: 1,
    travelAssistance: false,
  });
  
  // Handle current step
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  
  // Get user ID from cookie on component mount
  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId") || "";
    console.log("User ID from cookie:", userIdFromCookie);
    
    const tokenFromCookie = Cookies.get("token") || "";
    console.log("Token exists:", !!tokenFromCookie);
    
    if (userIdFromCookie) {
      setFormData(prevData => ({
        ...prevData,
        userId: userIdFromCookie
      }));
    } else {
      console.warn("No userId found in cookies!");
    }
  }, []);

  // Generic input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // For checkbox inputs, use the checked property
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
    // For number inputs, parse the string to a number
    else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseInt(value, 10)
      }));
    }
    // For all other inputs, use the value directly
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Navigation functions
  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Form submission handler
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
          setFormData(prev => ({
            ...prev,
            userId
          }));
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

  // Define all steps in the form
  const steps = [
    { title: 'Your Details' },
    { title: 'Travel Dates' },
    { title: 'Passengers' },
    { title: 'Travel Assistance' },
    { title: 'Confirmation' },
  ];
  // Render submitted confirmation
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] p-4">
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
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2e4369]">Plan Your Journey</h1>
          <p className="mt-2 text-lg text-gray-600">Complete all steps to book your travel</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Steps sidebar */}
            <div className="bg-[#f8fafc] p-6 md:w-80 border-r border-gray-100">
              <div className="space-y-1">
                {steps.map((s, index) => (
                  <div key={index} className="flex items-center py-3">
                    <div 
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 
                        ${index === currentStep 
                          ? 'bg-[#2e4369] text-white' 
                          : index < currentStep 
                            ? 'bg-[#3c527d] text-white' 
                            : 'bg-gray-200 text-gray-500'}`}
                    >
                      {index < currentStep ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className={`${index === currentStep ? 'text-[#2e4369] font-medium' : 'text-gray-500'}`}>
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 hidden md:block">
                <div className="bg-[#EEF2FF] p-4 rounded-lg border border-[#C7D2FE]">
                  <p className="text-sm text-[#2e4369]">
                    Need help with your booking? Contact our support team.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Form content */}
            <div className="flex-1 p-6 md:p-8">
              {/* Step 1: Personal Details */}
              {currentStep === 0 && (
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
                          value={formData.name} 
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
                          value={formData.startLocation} 
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
                          value={formData.endLocation} 
                          onChange={handleChange}
                          placeholder="Enter end location"
                          className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90" 
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <button 
                        type="button"
                        onClick={goToNextStep} 
                        className="w-full px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travel Dates */}
              {currentStep === 1 && (
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
                          value={formData.startDate} 
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
                          value={formData.endDate} 
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black bg-white/90"
                          aria-label="End Date"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex space-x-3">
                      <button 
                        type="button"
                        onClick={goToPrevStep} 
                        className="px-6 py-3 bg-[#1a2a45] text-white font-medium rounded-lg shadow transition-all hover:bg-[#253a5f] focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Back
                      </button>
                      
                      <button 
                        type="button"
                        onClick={goToNextStep} 
                        className="flex-1 px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Number of Passengers */}
              {currentStep === 2 && (
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
                        value={formData.passengers === 0 ? '' : formData.passengers}
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
                        onClick={goToPrevStep} 
                        className="px-6 py-3 bg-[#1a2a45] text-white font-medium rounded-lg shadow transition-all hover:bg-[#253a5f] focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Back
                      </button>
                      
                      <button 
                        type="button"
                        onClick={goToNextStep} 
                        className="flex-1 px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Travel Assistance */}
              {currentStep === 3 && (
                <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-2xl font-semibold mb-4">Travel Assistance</h2>
                  <p className="mb-6 text-blue-100">Let us know if you need any special assistance</p>
                  
                  <div className="space-y-5">
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="travelAssistance"
                          name="travelAssistance"
                          checked={formData.travelAssistance}
                          onChange={handleChange}
                          className="w-5 h-5 accent-[#2e4369]"
                        />
                        <label htmlFor="travelAssistance" className="text-lg text-white">
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
                        onClick={goToPrevStep} 
                        className="px-6 py-3 bg-[#1a2a45] text-white font-medium rounded-lg shadow transition-all hover:bg-[#253a5f] focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Back
                      </button>
                      
                      <button 
                        type="button"
                        onClick={goToNextStep} 
                        className="flex-1 px-6 py-3 bg-white text-[#2e4369] font-medium rounded-lg shadow transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 4 && (
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
                      onClick={goToPrevStep} 
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
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Travel Trip. All rights reserved.
        </div>
      </div>
    </div>
  );
}
