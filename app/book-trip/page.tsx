"use client"
import axios from "axios";
import { useState } from "react";

const BookTrip = ()=>{
    type BookingDetails = {
        name:string,
        startLocation:string,
        endLocation:string,
        startDate:string,
        endDate: string,
        passengers: {
            adults: number,
            children: number,
            infants: number,
        },
        travelAssistance: boolean,

    }

    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        name:"",
        startLocation: "",
        endLocation: "",
        startDate: "",
        endDate: "",
        passengers: {
            adults: 0,
            children: 0,
            infants: 0
        },
        travelAssistance: false,
    })

    const formChangeHandle = (e:any)=>{
        const {name,value}=e.target;
        setBookingDetails((prevData)=>({
            ...prevData,
            [name]:value
        }))

    }

    const formSubmissionHandle = async (e:any)=>{
        e.preventDefault();
        // console.log(bookingDetails)
        const response = await axios.post("/api/book-trip",bookingDetails);
        console.log(response.data)
    }

    return (
        <div className="w-3/4 bg-[#2e4369] text-white p-12">
        <h2 className="text-3xl font-semibold mb-2">Your Details</h2>
        <p className="text-gray-300 mb-8">Enter your name and location details</p>

        <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-6 text-gray-800">
            <form onSubmit={formSubmissionHandle}>

            
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={formChangeHandle}
                    name="name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Start Location</label>
                    <input
                    type="text"
                    placeholder="Enter start location"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={formChangeHandle}
                    name="startLocation"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">End Location</label>
                    <input
                    type="text"
                    placeholder="Enter end location"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={formChangeHandle}
                    name="endLocation"
                    />
                </div>

                <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    
    )
}

export default BookTrip;