import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoCheckmarkCircle, IoBagCheckOutline } from "react-icons/io5";

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  await connectDB();

  const order = await Order.findById(id).lean();
  if (!order) notFound();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-8 border-b border-gray-100 pb-6">
          <Link href="/" className="text-2xl font-black tracking-tight text-gray-900">
            XTEAMWEAR
          </Link>
        </div>

        {/* Status Header */}
        <div className="text-center space-y-2 mb-8">
          <IoCheckmarkCircle className="text-6xl text-emerald-500 mx-auto" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="text-sm text-gray-500">
            Order Confirmation ID:{" "}
            <span className="font-mono font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
              {String(order._id)}
            </span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200/80 space-y-4 mb-6">
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <IoBagCheckOutline className="text-lg text-gray-700" />
            <h2 className="font-bold text-gray-900 text-sm">Order Summary</h2>
          </div>

          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Color: {item.color} | Qty: {item.qty}
                  </p>
                </div>
                <p className="font-bold text-gray-900">
                  ${(item.price * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-200 pt-3">
            <span>Total Paid</span>
            <span>
              ${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
            </span>
          </div>
        </div>

        {/* Shipping Card */}
        <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200/80 mb-8 space-y-1">
          <h2 className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-2 mb-2">
            Shipping Address
          </h2>
          <p className="text-sm font-semibold text-gray-800">{order.shippingAddress.fullName}</p>
          <p className="text-xs text-gray-600">
            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p className="text-xs text-gray-600">{order.shippingAddress.country}</p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}