import { NextRequest, NextResponse } from "next/server";
import { MongoConnect } from "../../DB/MongoConnect";
import { bookingDetailsModel } from "../../DB/MongoDB";

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await MongoConnect();
    
    // Get userId from query params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    
    // Find bookings for this user
    const bookings = await bookingDetailsModel.find({ userId }).exec();
    
    console.log(`Found ${bookings.length} bookings for user ${userId}`);
    
    // Return the bookings
    return NextResponse.json(bookings);
    
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
