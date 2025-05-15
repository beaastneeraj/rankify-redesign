import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }
    await connectDB();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already in use." }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    // TODO: Set session/cookie here if needed
    return NextResponse.json({ message: "Signup successful", user: { email: user.email, name: user.name, _id: user._id } });
  } catch (error) {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
