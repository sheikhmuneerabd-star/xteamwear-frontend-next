import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    // Sirf wahi products laayein jinka isPopular true hai
    let popularProducts = await Product.find({ isPopular: true })
      .limit(8)
      .lean();

    // Fallback: Agar kisi ko popular mark nahi kiya, toh recent products dikha de
    if (popularProducts.length === 0) {
      popularProducts = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(8)
        .lean();
    }

    return NextResponse.json({ success: true, products: popularProducts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, products: [] },
      { status: 500 }
    );
  }
}