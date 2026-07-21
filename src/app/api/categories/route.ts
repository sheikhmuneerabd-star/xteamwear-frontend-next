import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import { auth } from "@/auth";

interface SubcategoryInput {
  name?: string;
  items?: string[];
}

function sanitizeSubcategories(subcategories: SubcategoryInput[] | undefined) {
  if (!Array.isArray(subcategories)) return [];
  return subcategories
    .map((sub) => ({
      name: (sub.name || "").trim(),
      items: Array.isArray(sub.items) ? sub.items.map((i) => i.trim()).filter(Boolean) : [],
    }))
    .filter((sub) => sub.name);
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1, name: 1 });
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, subcategories } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    await connectDB();

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }

    const count = await Category.countDocuments();
    const category = await Category.create({
      name: name.trim(),
      subcategories: sanitizeSubcategories(subcategories),
      order: count,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}