import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    await User.create({
      name,
      email: email.toLowerCase(),
      password: await hashPassword(password),
      role,
    });

    return NextResponse.json({ message: "Account created. Please sign in." });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}