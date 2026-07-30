"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

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
  pending: "bg-amber-100 text-amber-700 font-medium",
  processing: "bg-blue-100 text-blue-700 font-medium",
  shipped: "bg-purple-100 text-purple-700 font-medium",
  delivered: "bg-emerald-100 text-emerald-700 font-medium",
  cancelled: "bg-rose-100 text-rose-700 font-medium",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const customerName = o.shippingAddress?.fullName?.toLowerCase() || "";
      const city = o.shippingAddress?.city?.toLowerCase() || "";
      const orderId = o._id.toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        customerName.includes(query) ||
        city.includes(query) ||
        orderId.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  // Reset to Page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery, itemsPerPage]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-xs text-slate-500 mt-1">Manage, filter, and track all customer orders</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
            Total Matching: <span className="text-slate-900 font-bold">{totalItems}</span> orders
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by Order ID, Name, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E3D] focus:bg-white transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Show per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-700 focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-2">Status:</span>
          {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-all ${
                statusFilter === s
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-400">Loading orders...</div>
      ) : paginatedOrders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium text-sm">No orders found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-slate-900">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{order.shippingAddress?.fullName || "Guest User"}</p>
                      <p className="text-xs text-slate-400">{order.shippingAddress?.city}</p>
                    </td>
                    <td className="p-4 font-medium">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </td>
                    <td className="p-4 font-bold text-slate-900">{formatPrice(order.total)}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1E3D] hover:bg-slate-100"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION FOOTER ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 border-t border-slate-200 gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{totalItems > 0 ? startIndex + 1 : 0}</span> to{" "}
              <span className="font-bold text-slate-800">{endIndex}</span> of{" "}
              <span className="font-bold text-slate-800">{totalItems}</span> entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-100 disabled:opacity-40 transition-all"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, idx, array) => {
                  const prevPage = array[idx - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? "bg-[#0B1E3D] text-white shadow-sm"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  );
                })}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-semibold hover:bg-slate-100 disabled:opacity-40 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}