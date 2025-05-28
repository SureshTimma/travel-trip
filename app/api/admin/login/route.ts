import { NextRequest, NextResponse } from "next/server";
import { MongoConnect } from "@/app/DB/MongoConnect";

export const GET = () => {
  return NextResponse.json("Get req Working");
};

export const POST = async (req: NextRequest) => {
  await MongoConnect();

  const body = await req.json();
  const { email, password } = body;
  console.log("Email:", email);
  console.log("Password:", password);

  if (email === "qwerty@mail.com" && password === "qwerty123") {
    return NextResponse.json({ success: true, message: "Login successful" });
  }

  return NextResponse.json({ error: "Invalid credentials" });
};