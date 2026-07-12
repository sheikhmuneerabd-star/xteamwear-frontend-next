"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface AdminOrder {
  _id: string;
  items: { name: string; qty: number }[];
  shippingAddress: { fullName: string; city: string };
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              filter === s ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-3 font-mono text-xs">{order._id.slice(-8)}</td>
                  <td className="p-3">
                    {order.shippingAddress.fullName}
                    <p className="text-xs text-gray-500">{order.shippingAddress.city}</p>
                  </td>
                  <td className="p-3">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </td>
                  <td className="p-3">Rs.{order.total.toLocaleString("en-PK")}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Link href={`/admin/orders/${order._id}`} className="text-blue-600 hover:underline text-sm">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}