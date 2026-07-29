import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSettings from "@/lib/models/SiteSettings";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

// GET: Fetch Settings
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
        shippingConfig: {
          freeShippingThreshold: 150,
          standardShippingFee: 15,
        },
      });
      settings = newSettings.toObject();
    }

    return NextResponse.json(
      { success: true, settings },
      {
        headers: {
          "Cache-Control":
            "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper to save settings and purge cache
async function saveSettings(body: any) {
  await connectDB();

  const settings = await SiteSettings.findOneAndUpdate(
    {},
    { $set: body },
    { new: true, upsert: true, runValidators: true }
  ).lean();

  try {
    revalidateTag("site-settings", "max");
  } catch (err) {
    console.log("Tag revalidation bypassed");
  }

  return settings;
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const settings = await saveSettings(body);

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const settings = await saveSettings(body);

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error("POST settings error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}