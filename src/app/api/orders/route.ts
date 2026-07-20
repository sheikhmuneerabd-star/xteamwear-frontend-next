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

    // Atomic stock decrement — check aur decrement ek hi query mein,
    // taake do users ek sath order karein to bhi stock negative na jaye
    const decrementedItems: { productId: string; color: string; qty: number }[] = [];

    for (const item of items) {
      const result = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          variants: {
            $elemMatch: {
              color: { $regex: `^${item.color.trim()}$`, $options: "i" },
              stock: { $gte: item.qty },
            },
          },
        },
        {
          $inc: { "variants.$[v].stock": -item.qty },
        },
        {
          arrayFilters: [{ "v.color": { $regex: `^${item.color.trim()}$`, $options: "i" } }],
          new: true,
        }
      );

      if (!result) {
        // Rollback — jitne items ab tak decrement ho chuke, unhe wapas add karo
        for (const done of decrementedItems) {
          await Product.updateOne(
            { _id: done.productId, "variants.color": { $regex: `^${done.color}$`, $options: "i" } },
            { $inc: { "variants.$.stock": done.qty } }
          );
        }

        // Pata karo error kis wajah se aayi — product missing, variant missing, ya stock kam
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
        return NextResponse.json(
          { error: `Only ${variant.stock} left in stock for ${item.name} (${item.color})` },
          { status: 409 }
        );
      }

      decrementedItems.push({ productId: item.productId, color: item.color, qty: item.qty });
      // "available" ko yahan touch nahi karte — admin ka manual "In Stock" checkbox
      // hi final decision hai, stock khatam hone se ye khud-ba-khud change nahi hoga
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty,
      0
    );

    try {
      const order = await Order.create({
        userId: session?.user?.id,
        items,
        shippingAddress,
        subtotal,
        total: subtotal,
        notes,
      });

      return NextResponse.json({ order }, { status: 201 });
    } catch (orderError) {
      // Order create fail hui — jo stock decrement ho chuka wo rollback karo
      for (const done of decrementedItems) {
        await Product.updateOne(
          { _id: done.productId, "variants.color": { $regex: `^${done.color}$`, $options: "i" } },
          { $inc: { "variants.$.stock": done.qty } }
        );
      }
      throw orderError;
    }
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

    const filter = session.user.role === "admin" ? {} : { userId: session.user.id };
    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}