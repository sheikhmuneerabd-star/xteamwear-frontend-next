import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import { auth } from "@/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

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

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const { name, subcategories, order } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    await connectDB();

    const update: {
      name: string;
      subcategories: ReturnType<typeof sanitizeSubcategories>;
      order?: number;
    } = {
      name: name.trim(),
      subcategories: sanitizeSubcategories(subcategories),
    };
    if (typeof order === "number") {
      update.order = order;
    }

    const category = await Category.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await connectDB();

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}