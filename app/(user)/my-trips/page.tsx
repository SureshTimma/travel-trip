import { MongoConnect } from "../../DB/MongoConnect";
import { bookingDetailsModel } from "../../DB/MongoDB";
import Link from "next/link";

// Interface for booking type
interface Booking {
  _id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  startDate: Date;
}

const MyTrips = async () => {
  await MongoConnect();
  const bookings = await bookingDetailsModel.find({ userId: "683556fd6b39a6908271df9c" }).exec();

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

        {bookings.length > 0 ? (
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
}

export default MyTrips;