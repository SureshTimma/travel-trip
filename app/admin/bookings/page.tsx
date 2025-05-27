import { bookingDetailsModel } from "@/app/DB/MongoDB";

const Bookings = async () => {
    const bookings = await bookingDetailsModel.find({});
      return (
        <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-[#2e4369]">Booking Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="bg-[#2e4369] text-white p-4">
                            <h2 className="text-xl font-semibold">{booking.name}'s Trip</h2>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">From</p>
                                    <p className="font-medium">{booking.startLocation}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">To</p>
                                    <p className="font-medium">{booking.endLocation}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Start Date</p>
                                    <p className="font-medium">{booking.startDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">End Date</p>
                                    <p className="font-medium">{booking.endDate}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E2E8F0] text-[#2e4369]">
                                        {booking.passengers} {booking.passengers === 1 ? 'Passenger' : 'Passengers'}
                                    </span>
                                </div>
                                <div>
                                    {booking.travelAssistance ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2e4369] bg-opacity-20 text-[#2e4369]">
                                            Assistance Requested
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            No Assistance
                                        </span>
                                    )}
                                </div>
                            </div>
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500">User ID: {booking.userId}</p>
                                <p className="text-xs text-gray-500">Booking ID: {booking._id?.toString()}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;