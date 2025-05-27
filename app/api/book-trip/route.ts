import { MongoConnect } from "@/app/DB/MongoConnect";
import { bookingDetailsModel } from "@/app/DB/MongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)=>{
    await MongoConnect();
    const body = await req.json();
    bookingDetailsModel.create({
        userId: body.userId,
        name:body.name,
        startLocation:body.startLocation,
        endLocation:body.endLocation,
        startDate:body.startDate,
        endDate:body.endDate,
        passengers:body.passengers,
        travelAssistance:body.travelAssistance
    })
    return NextResponse.json("data posting");
}