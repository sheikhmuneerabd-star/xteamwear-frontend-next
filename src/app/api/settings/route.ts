import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSettings from "@/lib/models/SiteSettings";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();

    let settings = await SiteSettings.findOne().lean();

    if (!settings) {
      const newSettings = await SiteSettings.create({
        logo: "",
        heroSlides: [],
        squadImages: [],
        advantages: [],
        bespokeBanner: {},
        categoriesShowcase: [],
        trendingTags: [],
      });
      settings = newSettings.toObject();
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    await connectDB();

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}