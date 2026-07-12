import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoCheckmarkCircle } from "react-icons/io5";

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  await connectDB();

  const order = await Order.findById(id).lean();
  if (!order) notFound();

  return (
    <div className="w-[90%] max-w-2xl mx-auto py-16 text-center">
       <div className="mb-10">
        <Link href="/" className="text-2xl font-bold">
          XTEAMWEAR
        </Link>
      </div>
      <IoCheckmarkCircle className="text-6xl text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">
        Order ID: <span className="font-mono font-medium">{String(order._id)}</span>
      </p>

      <div className="text-left bg-gray-50 rounded-lg p-6 space-y-4">
        <h2 className="font-semibold border-b pb-2">Order Details</h2>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <p>
              {item.name} ({item.color}) × {item.qty}
            </p>
            <p className="font-medium">Rs.{(item.price * item.qty).toLocaleString("en-PK")}</p>
          </div>
        ))}
        <div className="flex justify-between font-semibold border-t pt-3">
          <p>Total</p>
          <p>Rs.{order.total.toLocaleString("en-PK")} PKR</p>
        </div>
      </div>

      <div className="text-left bg-gray-50 rounded-lg p-6 mt-4">
        <h2 className="font-semibold border-b pb-2 mb-2">Shipping To</h2>
        <p className="text-sm">{order.shippingAddress.fullName}</p>
        <p className="text-sm text-gray-600">
          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        </p>
        <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
      </div>

      <Link
        href="/"
        className="inline-block mt-8 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-md font-medium transition-all duration-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}