"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiBox,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
  FiArrowLeft,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";

interface OrderItem {
  productId: string;
  name: string;
  color: string;
  sku?: string;
  price: number;
  qty: number;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface Order {
  _id: string;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  subtotal: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <FiCheckCircle /> Delivered
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <FiTruck /> Shipped
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <FiClock /> Processing
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <FiXCircle /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <FiBox /> Pending
          </span>
        );
    }
  };

  const pendingCount = orders.filter((o) => o.status === "pending" || o.status === "processing").length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* 1400px Wide Container to fill desktop margins */}
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Breadcrumb & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E1D6] pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#A9762F] transition-colors mb-2 uppercase tracking-wider"
            >
              <FiArrowLeft /> Back to Shop
            </Link>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E3D] uppercase tracking-tight">
              My Orders & Tracking
            </h1>
          </div>

          {!loading && orders.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="bg-white border border-[#E6E1D6] px-4 py-2 rounded-xl text-center shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Orders</span>
                <span className="text-lg font-black text-[#0B1E3D]">{orders.length}</span>
              </div>
              <div className="bg-white border border-[#E6E1D6] px-4 py-2 rounded-xl text-center shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">In Progress</span>
                <span className="text-lg font-black text-[#A9762F]">{pendingCount}</span>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-semibold text-base">
            Loading your order history...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E6E1D6] shadow-sm max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#A9762F]/10 text-[#A9762F] rounded-full flex items-center justify-center mx-auto text-3xl">
              <FiBox />
            </div>
            <h2 className="text-xl font-bold text-[#0B1E3D]">No Orders Placed Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Looks like you haven't placed any orders yet. Explore our custom team apparel or start a custom order today!
            </p>
            <Link
              href="/"
              className="inline-block bg-[#0B1E3D] hover:bg-[#A9762F] text-white font-black text-xs uppercase px-8 py-3.5 rounded-xl transition-all shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Main Dashboard Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Orders List) */}
            <div className="lg:col-span-8 space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-[#E6E1D6] shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Order Card Top Bar */}
                  <div className="bg-[#0B1E3D]/5 p-5 border-b border-[#E6E1D6] flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-[#0B1E3D] uppercase tracking-wider block">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-500 font-medium block">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.status)}
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Total</span>
                        <span className="text-xl font-black text-[#0B1E3D]">
                          ${order.total}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-6 divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden shrink-0 flex items-center justify-center p-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-[#0B1E3D] leading-snug">
                              {item.name}
                            </h4>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                              <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                                Color: {item.color}
                              </span>
                              {item.sku && item.sku !== "N/A" && (
                                <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                                  SKU: {item.sku}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 pt-0.5">
                              Qty: <span className="font-bold text-slate-700">{item.qty}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right sm:self-center self-end">
                          <span className="text-sm font-black text-[#0B1E3D]">
                            ${item.price * item.qty}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-medium">
                            (${item.price} each)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Address & Payment Info */}
                  <div className="bg-[#F8F9FA] p-5 border-t border-[#E6E1D6] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 text-slate-600">
                      <span className="font-bold text-[#0B1E3D] uppercase text-[11px] block">
                        Shipping Address
                      </span>
                      <p className="font-semibold text-slate-800">{order.shippingAddress?.fullName}</p>
                      <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                      <p>{order.shippingAddress?.country} - {order.shippingAddress?.postalCode}</p>
                    </div>

                    <div className="space-y-1 text-slate-600 md:border-l md:border-slate-200 md:pl-4">
                      <span className="font-bold text-[#0B1E3D] uppercase text-[11px] block">
                        Payment Info
                      </span>
                      <p>
                        Method: <span className="font-bold text-slate-800 uppercase">{order.paymentMethod}</span>
                      </p>
                      <p>
                        Status: <span className="font-bold text-slate-800 capitalize">{order.paymentStatus}</span>
                      </p>
                      <p>
                        Subtotal: <span className="font-bold text-slate-800">${order.subtotal}</span>
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Column (Sidebar Support & Legend) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Support Card */}
              <div className="bg-[#0B1E3D] text-white rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#A9762F]/20 text-[#A9762F] rounded-xl flex items-center justify-center text-xl">
                    <FiHelpCircle />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide">Need Assistance?</h3>
                    <p className="text-xs text-slate-300">Order changes or questions?</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Our customer support is available to assist you with order status, design changes, or delivery schedules.
                </p>

                <div className="pt-2 space-y-2">
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase py-3 rounded-xl transition-all shadow-sm w-full"
                  >
                    <FiMessageSquare className="text-base" /> WhatsApp Live Support
                  </a>
                </div>
              </div>

              {/* Status Explanation */}
              <div className="bg-white rounded-2xl border border-[#E6E1D6] p-6 shadow-xs space-y-3">
                <h4 className="font-bold text-xs uppercase text-[#0B1E3D] tracking-wider">
                  Tracking Status Guide
                </h4>
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                    <span><b>Pending:</b> Order received & being processed.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span><b>Processing:</b> Items in production/printing.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <span><b>Shipped:</b> Dispatched with courier partner.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><b>Delivered:</b> Delivered to your address.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}