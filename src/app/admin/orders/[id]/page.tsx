"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

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
      note?: string;
      players?: { size: string; name: string; number: string }[];
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
  notes?: string;
  createdAt: string;
}

const statusOptions: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data.order);
      setLoading(false);
    }
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setUpdating(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) {
      setOrder(data.order);
    }
    setUpdating(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Order #{order._id.slice(-8)}</h1>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          disabled={updating}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium capitalize outline-none focus:border-black"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 border-b last:border-b-0 pb-4 last:pb-0">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      {item.color} · SKU: {item.sku} · Qty: {item.qty}
                    </p>

                    {item.sizingDetailData && (
                      <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                        {item.sizingDetailData.teamName && <p>Team: {item.sizingDetailData.teamName}</p>}
                        {item.sizingDetailData.playerNumberOption && (
                          <p>Number Option: {item.sizingDetailData.playerNumberOption}</p>
                        )}
                        {item.sizingDetailData.players?.map((p, pi) => (
                          <p key={pi}>
                            Player {pi + 1}: {p.name} (#{p.number}, {p.size})
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium">Rs.{(item.price * item.qty).toLocaleString("en-PK")}</p>
                </div>
              ))}
            </div>
          </div>

          {order.notes && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold mb-2">Order Notes</h2>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-3">Shipping Address</h2>
            <div className="text-sm space-y-1 text-gray-700">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.email}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-semibold mb-3">Order Total</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p>Rs.{order.subtotal.toLocaleString("en-PK")}</p>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <p>Total</p>
                <p>Rs.{order.total.toLocaleString("en-PK")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}