"use client";

import { useEffect, useState, use } from "react";
import { formatPrice } from "@/lib/formatPrice";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type PaymentMethod = "paypal" | "cod";
type PaymentStatus = "pending" | "paid" | "failed";

interface OrderDetail {
  _id: string;
  items: {
    name: string;
    color: string;
    sku: string;
    price: number;
    qty: number;
    image: string;
    sizingDetailData?: {
      teamName?: string;
      playerNumberOption?: string;
      sponsorOption?: string;
      sponsorLocation?: string;
      sponsorLogo?: string;
      logo?: string;
      logoUrl?: string;
      sponsorLogoUrl?: string;
      uploadedLogo?: string;
      uploadedLogoUrl?: string;
      note?: string;
      players?: { size: string; name: string; number: string }[];
      [key: string]: any; // Catch-all for dynamic cart properties
    };
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

const statusOptions: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect width='18' height='18' x='3' y='3' rx='2' ry='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>";

// Helper function to extract valid image URL from any dynamic property
function getLogoFromDetails(details?: Record<string, any>): string | null {
  if (!details) return null;

  // Direct check for known properties
  const directUrl =
    details.sponsorLogo ||
    details.logo ||
    details.logoUrl ||
    details.sponsorLogoUrl ||
    details.uploadedLogo ||
    details.uploadedLogoUrl;

  if (typeof directUrl === "string" && directUrl.trim() !== "") {
    return directUrl;
  }

  // Fallback: Scan all object keys for image extensions or base64/http format
  for (const key in details) {
    const val = details[key];
    if (
      typeof val === "string" &&
      (val.startsWith("http") || val.startsWith("data:image/") || val.startsWith("/"))
    ) {
      return val;
    }
  }

  return null;
}

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error("Order fetch failed");
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        console.error("Order load karne mein masla hua:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
      }
    } catch (err) {
      console.error("Status update nahi ho saka:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Order details load ho rahi hain...</p>;
  if (!order) return <p className="p-6 text-red-500">Order nahi mila.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-8)}</h1>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          disabled={updating}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium capitalize outline-none focus:ring-2 focus:ring-black bg-white shadow-sm cursor-pointer"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg border-b pb-3 mb-4 text-gray-800">Order Items</h2>
            <div className="space-y-6">
              {order.items.map((item, i) => {
                const logoUrl = getLogoFromDetails(item.sizingDetailData);

                return (
                  <div key={i} className="flex gap-4 border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50 flex items-center justify-center p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image && item.image !== "/placeholder.png" ? item.image : DEFAULT_PLACEHOLDER}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_PLACEHOLDER;
                        }}
                      />
                    </div>

                    <div className="flex-1 text-sm space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-900 text-base">{item.name}</p>
                        <p className="font-bold text-gray-900">{formatPrice(item.price * item.qty)}</p>
                      </div>

                      <p className="text-gray-500 text-xs">
                        Color: <span className="font-medium text-gray-700">{item.color}</span> · SKU:{" "}
                        <span className="font-medium text-gray-700">{item.sku || "N/A"}</span> · Qty:{" "}
                        <span className="font-medium text-gray-700">{item.qty}</span>
                      </p>

                      {item.sizingDetailData && (
                        <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200 text-xs space-y-3">
                          <p className="font-semibold text-gray-700 uppercase tracking-wider text-[11px] border-b border-gray-200 pb-1">
                            Customization Details
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-gray-600">
                            {item.sizingDetailData.teamName && (
                              <p>
                                <span className="font-medium text-gray-900">Team Name:</span> {item.sizingDetailData.teamName}
                              </p>
                            )}
                            {item.sizingDetailData.playerNumberOption && (
                              <p>
                                <span className="font-medium text-gray-900">Number Style:</span> {item.sizingDetailData.playerNumberOption}
                              </p>
                            )}
                            {item.sizingDetailData.sponsorOption && (
                              <p>
                                <span className="font-medium text-gray-900">Sponsor:</span> {item.sizingDetailData.sponsorOption}
                              </p>
                            )}
                            {item.sizingDetailData.sponsorLocation && (
                              <p>
                                <span className="font-medium text-gray-900">Sponsor Location:</span> {item.sizingDetailData.sponsorLocation}
                              </p>
                            )}
                          </div>

                          {/* UPLOADED LOGO SECTION */}
                          {logoUrl ? (
                            <div className="pt-2 border-t border-gray-200 flex items-center justify-between bg-white p-2.5 rounded-lg border">
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-900 text-xs">Uploaded Logo:</span>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={logoUrl}
                                  alt="Uploaded Logo"
                                  className="w-12 h-12 object-contain border bg-gray-50 rounded p-1 shadow-sm"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                  }}
                                />
                              </div>
                              <a
                                href={logoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 text-[11px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                              >
                                View Full Logo ↗
                              </a>
                            </div>
                          ) : null}

                          {item.sizingDetailData.note && (
                            <p className="text-gray-600 italic border-t border-gray-200 pt-1">
                              <span className="font-medium text-gray-900 not-italic">Custom Note:</span> {item.sizingDetailData.note}
                            </p>
                          )}

                          {item.sizingDetailData.players && item.sizingDetailData.players.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="font-medium text-gray-800 mb-1.5">
                                Players Roster ({item.sizingDetailData.players.length}):
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {item.sizingDetailData.players.map((p, pi) => (
                                  <div key={pi} className="bg-white border border-gray-200 rounded px-2.5 py-1 flex justify-between items-center text-gray-700">
                                    <span className="font-medium truncate max-w-[120px]">
                                      {pi + 1}. {p.name || "N/A"}
                                    </span>
                                    <span className="text-gray-500 font-mono">
                                      #{p.number || "--"} | <b className="text-black">{p.size}</b>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {order.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-800 mb-2">Customer Order Notes</h2>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-3 border-b pb-2">Shipping Address</h2>
            <div className="text-sm space-y-1 text-gray-700">
              <p className="font-bold text-gray-900">{order.shippingAddress.fullName}</p>
              <p className="text-gray-600">{order.shippingAddress.phone}</p>
              <p className="text-gray-600">{order.shippingAddress.email}</p>
              <p className="pt-2 border-t mt-2 text-gray-700">{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="font-medium text-gray-900">{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-3 border-b pb-2">Payment Info</h2>
            <div className="text-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Method:</span>
                <span className="font-bold uppercase text-gray-900">{order.paymentMethod || "COD"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2.5 py-0.5 text-xs rounded-full font-semibold capitalize ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {order.paymentStatus || "pending"}
                </span>
              </div>
              {order.paymentId && (
                <div className="flex justify-between items-center text-xs pt-2 border-t">
                  <span className="text-gray-500">Txn ID:</span>
                  <span className="font-mono text-gray-800 font-semibold bg-gray-100 px-2 py-0.5 rounded truncate max-w-[140px]">
                    {order.paymentId}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-3 border-b pb-2">Summary</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p className="font-medium text-gray-900">{formatPrice(order.subtotal ?? 0)}</p>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 border-t pt-3">
                <p>Total Amount</p>
                <p>{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}