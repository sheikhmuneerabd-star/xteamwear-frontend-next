import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { auth } from "@/auth";
import { findDuplicateSku } from "@/lib/skuCheck";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, oldPrice, newPrice, category, variants } = body;

    if (!name || !oldPrice || !newPrice || !category || !variants?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    for (const v of variants) {
      if (!v.sku) {
        return NextResponse.json({ error: "Every variant must have a SKU" }, { status: 400 });
      }
    }

    await connectDB();

    const skus = variants.map((v: { sku: string }) => v.sku.toUpperCase());
    const duplicate = await findDuplicateSku(skus);
    if (duplicate) {
      return NextResponse.json({ error: `SKU "${duplicate}" is already in use` }, { status: 409 });
    }

    const available = variants.some((v: { stock: number }) => v.stock > 0);

    const product = await Product.create({ name, oldPrice, newPrice, category, available, variants });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}