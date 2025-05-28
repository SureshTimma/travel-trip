"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
    const router = useRouter();
  
    type UserData = {
        email: string,
        password: string
    }
    
    const [userData, setUserData] = useState<UserData>({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const onFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/signin", userData);
            console.log("Sign in successful:", response.data);
            
            // Check if cookies were set
            console.log("Cookies after signin:", document.cookie);
            
            // Redirect to travel form after successful sign-in
            router.push('/travel-form');
        } catch (error) {
            console.error("Sign in failed:", error);
            alert("Sign in failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4 py-8">
            <form onSubmit={onFormSubmission} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border-t-4 border-[#2e4369] transform transition-all duration-300 hover:translate-y-[-5px]">
                <div className="text-center mb-8">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-[#2e4369] rounded-full mb-4 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-center text-[#2e4369]">Welcome Back</h1>
                    <p className="text-gray-500 mt-1">Sign in to access your account</p>
                </div>
                
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-700">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e4369] focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-700">
                        Password
                    </label>
                    <div className="relative">                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full pl-10 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2e4369] focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="w-full bg-[#2e4369] text-white font-bold py-3 rounded-lg hover:bg-[#3c527d] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    Sign In
                </button>

                <p className="mt-6 text-center text-sm text-gray-700">
                    Not registered yet?
                    <Link href="/signup" className="text-[#2e4369] font-semibold hover:underline ml-1 cursor-pointer">
                        Sign Up
                    </Link>
                </p>

                <p className="mt-4 text-center text-sm text-gray-700">
                    <Link href="/" className="text-[#2e4369] font-semibold hover:underline cursor-pointer">
                        ← Return to Home
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;