import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const { items, shippingAddress, notes, paymentMethod, paymentStatus, paymentId } = body;

    if (!items?.length || !shippingAddress) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    await connectDB();

    const DEFAULT_SVG =
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.5'><rect width='18' height='18' x='3' y='3' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><path d='m21 15-5-5-11 11'/></svg>";

    const sanitizedItems = items.map((item: any) => ({
      ...item,
      productId: item.productId || item._id || item.id,
      image:
        item.image && item.image.trim() !== "" && item.image !== "/placeholder.png"
          ? item.image
          : DEFAULT_SVG,
      // 🔥 Explicitly pass sizingDetailData to avoid stripping
      sizingDetailData: item.sizingDetailData || null,
    }));

    // Atomic stock decrement
    const decrementedItems: { productId: string; color: string; qty: number }[] = [];

    for (const item of sanitizedItems) {
      if (!item.productId) {
        return NextResponse.json(
          { error: `Product ID missing for item: ${item.name || "Unknown"}` },
          { status: 400 }
        );
      }

      const result = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          variants: {
            $elemMatch: {
              color: { $regex: `^${item.color?.trim()}$`, $options: "i" },
              stock: { $gte: item.qty },
            },
          },
        },
        {
          $inc: { "variants.$[v].stock": -item.qty },
        },
        {
          arrayFilters: [{ "v.color": { $regex: `^${item.color?.trim()}$`, $options: "i" } }],
          returnDocument: "after",
        }
      );

      if (!result) {
        // Rollback previous stock decrements
        for (const done of decrementedItems) {
          await Product.updateOne(
            { _id: done.productId, "variants.color": { $regex: `^${done.color}$`, $options: "i" } },
            { $inc: { "variants.$.stock": done.qty } }
          );
        }

        const product = await Product.findById(item.productId);
        if (!product) {
          return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 404 });
        }
        const variant = product.variants.find(
          (v: any) => v.color.trim().toLowerCase() === item.color?.trim().toLowerCase()
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
    }

    const subtotal = sanitizedItems.reduce(
      (sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty,
      0
    );

    try {
      const order = await Order.create({
        userId: session?.user?.id,
        items: sanitizedItems,
        shippingAddress,
        subtotal,
        total: subtotal,
        notes,
        paymentMethod: paymentMethod || "cod",
        paymentStatus: paymentStatus || "pending",
        paymentId: paymentId || null,
      });

      // -------------------------------------------------------------
      // 2. AUTOMATED WHATSAPP MESSAGE LOGIC
      // -------------------------------------------------------------
      try {
        const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
        const token = process.env.ULTRAMSG_TOKEN;
        const toPhone = process.env.MY_WHATSAPP_NUMBER;

        // Extract Customer Details safely from Body/Address/Session
        const customerName =
          shippingAddress?.fullName ||
          shippingAddress?.name ||
          session?.user?.name ||
          "N/A";

        const phone =
          shippingAddress?.phone ||
          shippingAddress?.phoneNumber ||
          "N/A";

        const fullAddress = typeof shippingAddress === "string"
          ? shippingAddress
          : `${shippingAddress?.address || shippingAddress?.street || ""}, ${shippingAddress?.city || ""}`.trim() || "N/A";

        // Format Items List
        const orderItemsText = sanitizedItems.map(
          (item: any) => `- ${item.name || item.title || "Item"} (Color: ${item.color || "N/A"}, Qty: ${item.qty || item.quantity || 1})`
        ).join("\n");

        const messageContent = `
🚨 *NEW WEBSITE ORDER RECEIVED!* 🛍️

👤 *Customer Name:* ${customerName}
📞 *Phone Number:* ${phone}
📍 *Address:* ${fullAddress}

📦 *Ordered Items:*
${orderItemsText}

💰 *Total Amount:* $${subtotal}
---
✅ *Order placed automatically from website!*
        `;

        if (instanceId && token && toPhone) {
          await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              token: token,
              to: toPhone,
              body: messageContent,
            }),
          });

        }
      } catch (wsError) {
        // WhatsApp failure won't break the order creation process
        console.error("❌ Failed to send WhatsApp notification:", wsError);
      }

      return NextResponse.json({ order }, { status: 201 });
    } catch (orderError) {
      // Rollback on order creation error
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