'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);    useEffect(() => {
        // Check for userId to determine if user is logged in
        // We use userId instead of token because token is HttpOnly
        const userId = Cookies.get("userId");
        console.log("Navbar - userId from cookie:", userId);
        setIsLoggedIn(!!userId);
    }, []);

    return (
        <nav className="bg-[#2e4369] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            Travel Trip
                        </Link>
                    </div>
                    
                    <div className="hidden md:flex space-x-6">
                        <Link 
                            href="/" 
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3c527d] transition-colors"
                        >
                            Home
                        </Link>
                        
                        {isLoggedIn ? (
                            <>                                <Link 
                                    href="/travel-form" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3c527d] transition-colors"
                                >
                                    Book Trip
                                </Link>
                                <Link 
                                    href="/my-trips" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3c527d] transition-colors"
                                >
                                    My Trips
                                </Link>                                <Link 
                                    href="/signout" 
                                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-white text-[#2e4369] hover:bg-gray-100 transition-colors"
                                >
                                    Sign Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    href="/signup" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#3c527d] transition-colors"
                                >
                                    Sign Up
                                </Link>
                                <Link 
                                    href="/signin" 
                                    className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-white text-[#2e4369] hover:bg-gray-100 transition-colors"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button */}
                        <button 
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#3c527d] focus:outline-none"
                            aria-label="Open main menu"
                            title="Open main menu"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;