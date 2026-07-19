import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BespokeRequest from "@/lib/models/BespokeRequest";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, sports, quantity, customizationType, teamColors, details } = body;

    if (!name || !whatsapp || !email || !quantity || !customizationType) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    await connectDB();
    const req = await BespokeRequest.create({
      name,
      whatsapp,
      email,
      sports: sports || [],
      quantity,
      customizationType,
      teamColors: teamColors || [],
      details,
    });

    return NextResponse.json({ request: req }, { status: 201 });
  } catch (error) {
    console.error("Bespoke request error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();
    const requests = await BespokeRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Get bespoke requests error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}