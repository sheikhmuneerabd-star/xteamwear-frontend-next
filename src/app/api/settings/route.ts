import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSettings from "@/lib/models/SiteSettings";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        logo: "",
        heroSlides: [],
        squadImages: [],
        advantages: [],
        bespokeBanner: {},
        categoriesShowcase: [],
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    
    // FIX 1: Extract categoriesShowcase from request body
    const { 
      logo, 
      heroSlides, 
      squadImages, 
      advantages, 
      bespokeBanner, 
      categoriesShowcase 
    } = body;

    await connectDB();

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        logo,
        heroSlides,
        squadImages,
        advantages,
        bespokeBanner,
        categoriesShowcase, // FIX 2: Pass on creation
      });
    } else {
      settings.logo = logo;
      settings.heroSlides = heroSlides;
      settings.squadImages = squadImages;
      settings.advantages = advantages;
      settings.bespokeBanner = bespokeBanner;
      
      // FIX 3: Assign categoriesShowcase before saving
      if (categoriesShowcase !== undefined) {
        settings.categoriesShowcase = categoriesShowcase;
      }
      
      await settings.save();
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}