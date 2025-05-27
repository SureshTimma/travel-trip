import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { userModel } from "@/app/DB/MongoDB";
import { MongoConnect } from "@/app/DB/MongoConnect";



export const GET = ()=>{
    return NextResponse.json("Get req Working")
}

export const POST = async (req: NextRequest)=>{
    await MongoConnect();
    try {
        const JWT_SECRET= process.env.JWT_SECRET!;
        const body = await req.json();
        const { email, password } = body;

        // Find user in MongoDB
        const user = await userModel.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }

        // Basic password check (plain text)
        if (user.password !== password) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        // Create token with user ID
        const token = jwt.sign(
            { 
                id: user._id,
                username: user.username 
            },
            JWT_SECRET
        );        const response = NextResponse.json(
            { success: true, message: "Login successful" }
        );
        
        // Set token in cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });
          // Also store userId in cookie for easy access
        // Set httpOnly to false so it can be accessed by JavaScript
        response.cookies.set("userId", user._id.toString(), {
            httpOnly: false, // Changed to false so it's accessible via JavaScript
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });
        
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}