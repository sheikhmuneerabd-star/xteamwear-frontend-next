import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { hashPassword } from "@/lib/auth";
import { otpStore } from "../send-otp/route";

export async function POST(request: Request) {
  try {
    const { name, email, password, otp } = await request.json();

    if (!name || !email || !password || !otp) {
      return NextResponse.json({ error: "All fields including OTP are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Verify OTP First
    const record = otpStore.get(cleanEmail);
    if (!record) {
      return NextResponse.json({ error: "OTP expired or not requested. Please request again." }, { status: 400 });
    }

    if (Date.now() > record.expires) {
      otpStore.delete(cleanEmail);
      return NextResponse.json({ error: "OTP has expired. Please request a new code." }, { status: 400 });
    }

    if (record.code !== otp.trim()) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    await connectDB();

    // 2. Double check existing user
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    // 3. Create User
    await User.create({
      name,
      email: cleanEmail,
      password: await hashPassword(password),
      role,
      isVerified: true,
    });

    // Clear OTP after success
    otpStore.delete(cleanEmail);

    return NextResponse.json({ message: "Account created successfully!" });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}