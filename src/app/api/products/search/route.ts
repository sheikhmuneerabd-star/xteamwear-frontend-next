import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    await connectDB();

    if (!query) {
      const popularProducts = await Product.find({ isFeatured: true })
        .limit(6)
        .lean();
        
      const fallback = popularProducts.length > 0 
        ? popularProducts 
        : await Product.find({}).limit(6).lean();

      return NextResponse.json({ success: true, products: fallback });
    }

    const words = query
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    const wordRegexes = words.map((word) => new RegExp(word, "i"));

    const buildSearchQuery = (regexList: RegExp[]) => ({
      $or: [
        { title: { $in: regexList } },
        { description: { $in: regexList } },
        { category: { $in: regexList } },
        { subCategory: { $in: regexList } },
        { tags: { $in: regexList } },
        { color: { $in: regexList } },
      ],
    });

    let products = await Product.find({
      $and: wordRegexes.map((reg) => buildSearchQuery([reg])),
    })
      .limit(8)
      .lean();

    if (products.length === 0) {
      products = await Product.find(buildSearchQuery(wordRegexes))
        .limit(8)
        .lean();
    }

    let isFallback = false;
    if (products.length === 0) {
      products = await Product.find({})
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();
      isFallback = true;
    }

    return NextResponse.json({
      success: true,
      products,
      isFallback,
    });
  } catch (error: any) {
    console.error("Search products error:", error);
    return NextResponse.json(
      { success: false, error: error.message, products: [] },
      { status: 500 }
    );
  }
}