'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Cookies from "js-cookie";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Booking {
  _id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  passengers: number;
  travelAssistance: boolean;
}

const MyTrips = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/signin');
    },
  });

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // First try to get userId from NextAuth session
        let userId = session?.user?.id;
        
        // If not available, fall back to cookies (for backward compatibility)
        if (!userId) {
          userId = Cookies.get('userId');
          if (!userId) {
            console.warn('No userId found in session or cookies');
            setLoading(false);
            return;
          }
        }
        
        // Fetch bookings from an API endpoint
        const response = await axios.get(`/api/bookings?userId=${userId}`);
        setBookings(response.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
      // Only fetch bookings if session is authenticated or loading
    if (status === 'authenticated' || status === 'loading') {
      fetchBookings();
    }
  }, [session, status]);

  // Format date to display in a nice format
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2e4369]">My Trips</h1>
          <p className="mt-2 text-lg text-gray-600">View all your upcoming and past travels</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2e4369]"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking: Booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#2e4369] to-[#3c527d] p-4 text-white">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Booked By: {booking.name || 'Trip'}</h2>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      #{booking._id.toString().slice(-6)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Journey details */}
                  <div className="flex items-center mb-6">
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="text-lg font-medium text-[#2e4369]">{booking.startLocation}</p>
                        </div>
                        <div className="px-4">
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="text-lg font-medium text-[#2e4369]">{booking.endLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Date details */}
                  <div className="bg-[#f8fafc] p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Departure</p>
                        <p className="text-sm font-medium">{formatDate(booking.startDate)}</p>
                      </div>
                      <div className="h-8 border-l border-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500">Return</p>
                        <p className="text-sm font-medium">{formatDate(booking.endDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional details */}
                  <div className="mt-4 flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Passengers</p>
                      <p className="font-medium">{booking.passengers}</p>
                    </div>
                    {booking.travelAssistance && (
                      <div>
                        <p className="text-gray-500">Special Assistance</p>
                        <p className="font-medium text-blue-600">Yes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No trips found</h3>
            <p className="mt-2 text-gray-500">You haven&apos;t booked any trips yet.</p>
            <Link href="/travel-form" className="mt-4 inline-block px-6 py-2 bg-[#2e4369] text-white rounded-lg hover:bg-[#3c527d]">
              Book a Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
