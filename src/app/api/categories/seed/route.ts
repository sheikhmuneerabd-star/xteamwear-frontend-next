import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import { auth } from "@/auth";
import leftCategoriesData from "@/data/leftCategoryData";

export async function POST() {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();

    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      return NextResponse.json({ error: "Categories already exist, seeding skipped" }, { status: 409 });
    }

    const docs = leftCategoriesData.map((cat, index) => ({
      name: cat.title,
      subcategories: cat.items,
      order: index,
    }));

    await Category.insertMany(docs);

    return NextResponse.json({ message: `Seeded ${docs.length} categories` });
  } catch (error) {
    console.error("Seed categories error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}