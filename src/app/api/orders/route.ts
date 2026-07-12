import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const { items, shippingAddress, notes } = body;

    if (!items?.length || !shippingAddress) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    await connectDB();

    // Stock check + decrement — atomic tarike se, taake overselling na ho
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 404 });
      }

      const variant = product.variants.find(
        (v) => v.color.trim().toLowerCase() === item.color.trim().toLowerCase()
      );

      if (!variant) {
        return NextResponse.json(
          { error: `Variant "${item.color}" not found for ${item.name}` },
          { status: 409 }
        );
      }

      if (variant.stock < item.qty) {
        return NextResponse.json(
          { error: `Only ${variant.stock} left in stock for ${item.name} (${item.color})` },
          { status: 409 }
        );
      }
    }

    // Sab stock available hai, ab actually decrement karein
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const matchedVariant = product.variants.find(
        (v) => v.color.trim().toLowerCase() === item.color.trim().toLowerCase()
      );
      if (!matchedVariant) continue;

      await Product.updateOne(
        { _id: item.productId, "variants.color": matchedVariant.color },
        { $inc: { "variants.$.stock": -item.qty } }
      );

      const updatedProduct = await Product.findById(item.productId);
      if (updatedProduct) {
        updatedProduct.available = updatedProduct.variants.some((v) => v.stock > 0);
        await updatedProduct.save();
      }
    }

    const subtotal = items.reduce((sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty, 0);

    const order = await Order.create({
      userId: session?.user?.id,
      items,
      shippingAddress,
      subtotal,
      total: subtotal, // abhi shipping/tax nahi hai, seedha subtotal = total
      notes,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Admin sab orders dekh sakta hai, normal user sirf apne
    const filter = session.user.role === "admin" ? {} : { userId: session.user.id };
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}