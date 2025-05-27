// app/travel-form/page.tsx
'use client';
import { FormProvider } from './form-context';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from "./steps/step3"
import Step4 from './steps/step4';
import Step5 from './steps/step5';
import { useState } from 'react';

const steps = [
  { title: 'Your Details', component: Step1 },
  { title: 'Travel Dates', component: Step2 },
  { title: 'Guests', component: Step3 },
  { title: 'Travel Assistance', component: Step4 },
  { title: 'Confirmation', component: Step5 },
];

export default function TravelFormPage() {
  const [step, setStep] = useState(0);
  const StepComponent = steps[step].component;

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <FormProvider>
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
                          ${index === step 
                            ? 'bg-[#2e4369] text-white' 
                            : index < step 
                              ? 'bg-[#3c527d] text-white' 
                              : 'bg-gray-200 text-gray-500'}`}
                      >
                        {index < step ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className={`${index === step ? 'text-[#2e4369] font-medium' : 'text-gray-500'}`}>
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
                <StepComponent next={next} prev={prev} />
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PayTM Travel. All rights reserved.
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
