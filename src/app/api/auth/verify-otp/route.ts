import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const record = otpStore.get(cleanEmail);

    if (!record) {
      return NextResponse.json({ error: "OTP not requested or expired. Please request a new code." }, { status: 400 });
    }

    if (Date.now() > record.expires) {
      otpStore.delete(cleanEmail);
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    if (record.code !== otp.trim()) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    otpStore.delete(cleanEmail);

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}