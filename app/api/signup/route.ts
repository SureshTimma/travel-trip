import { MongoConnect } from "@/app/DB/MongoConnect"
import { userModel } from "@/app/DB/MongoDB";
import { connect } from "http2"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest)=>{
    const body = await req.json();
    console.log(body)
    await MongoConnect();    // Check if user with this email already exists
    const existingUser = await userModel.findOne({ email: body.email });
    
    if (existingUser) {
        return NextResponse.json(
            { error: "User with this email already exists" },
            { status: 400 }
        );
    }
    
    // Create new user
    const user = await userModel.create({
        email: body.email,
        password: body.password
    });    // Return success response with a message but don't include userId
    const response = NextResponse.json({
        success: true,
        message: "Signup successful! You can now sign in."
    });  

    return response
}