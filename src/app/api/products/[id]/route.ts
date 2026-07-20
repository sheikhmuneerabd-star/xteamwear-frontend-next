import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { auth } from "@/auth";
import { findDuplicateSku } from "@/lib/skuCheck";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    if (body.variants?.length) {
      for (const v of body.variants) {
        if (!v.sku) {
          return NextResponse.json({ error: "Every variant must have a SKU" }, { status: 400 });
        }
      }

      await connectDB();
      const skus = body.variants.map((v: { sku: string }) => v.sku.toUpperCase());
      const duplicate = await findDuplicateSku(skus, id);
      if (duplicate) {
        return NextResponse.json({ error: `SKU "${duplicate}" is already in use` }, { status: 409 });
      }
    }

    await connectDB();
    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Update product error:", error);
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

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}