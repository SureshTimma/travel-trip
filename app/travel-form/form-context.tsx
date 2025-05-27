// app/travel-form/formContext.tsx
'use client';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define FormData type outside component to make it accessible
export type FormData = {
  userId: string;
  name: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  passengers: number;
  travelAssistance: boolean;
};

// Define context type
type FormContextType = {
  formData: FormData;
  updateForm: (newData: Partial<FormData>) => void;
};

// Create context with proper type
const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    name: "",
    startLocation: "",
    endLocation: "",
    startDate: "",
    endDate: "",
    passengers: 0,
    travelAssistance: false,
  });
  
  // Use useEffect to access cookies after component mounts (client-side)
  useEffect(() => {
    // Get userId from client-side cookie
    const userIdFromCookie = Cookies.get("userId") || "";
    console.log("User ID from cookie:", userIdFromCookie);
    
    // Also check if token exists
    const tokenFromCookie = Cookies.get("token") || "";
    console.log("Token exists:", !!tokenFromCookie);
    
    if (userIdFromCookie) {
      console.log("Setting userId in form data");
      setFormData(prevData => ({
        ...prevData,
        userId: userIdFromCookie
      }));
    } else {
      console.warn("No userId found in cookies!");
    }
  }, []);

  const updateForm = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};
