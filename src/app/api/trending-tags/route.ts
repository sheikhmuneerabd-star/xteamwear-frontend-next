import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSettings from "@/lib/models/SiteSettings";

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne();
    const tags = settings?.trendingTags || [];

    return NextResponse.json({ success: true, tags });
  } catch (error: any) {
    console.error("Fetch trending tags error:", error);
    return NextResponse.json({ success: false, tags: [] }, { status: 500 });
  }
}