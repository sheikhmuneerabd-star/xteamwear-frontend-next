import { NextResponse } from "next/server";
import SiteSettings from "@/lib/models/SiteSettings";
import { connectDB } from "@/lib/db";

// GET: Fetch All Site Settings (including Categories Showcase)
export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({});
    }

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("GET Settings Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT / POST: Update Site Settings
async function handleSave(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const settings = await SiteSettings.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error("UPDATE Settings Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  return handleSave(req);
}

export async function POST(req: Request) {
  return handleSave(req);
}