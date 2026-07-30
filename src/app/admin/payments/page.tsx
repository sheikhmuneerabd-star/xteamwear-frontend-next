"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

type PaymentFilter = "all" | "paypal" | "cashapp" | "cod";

interface PaymentRecord {
  _id: string;
  paymentMethod?: string;
  total: number;
  status: string;
  createdAt: string;
  shippingAddress?: {
    fullName: string;
    city: string;
    address?: string;
    phone?: string;
  };
}

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch payments data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  const matchesPaymentMethod = (orderMethod: string = "", filterMethod: PaymentFilter) => {
    if (filterMethod === "all") return true;
    const method = orderMethod.toLowerCase().replace(/[\s_-]/g, "");
    if (filterMethod === "paypal") return method.includes("paypal");
    if (filterMethod === "cashapp") return method.includes("cashapp") || method.includes("cash");
    if (filterMethod === "cod") return method.includes("cod") || method.includes("delivery");
    return method === filterMethod;
  };

  const filteredPayments = useMemo(() => {
    return orders.filter((o) => {
      const matchesPayment = matchesPaymentMethod(o.paymentMethod, paymentFilter);
      const name = o.shippingAddress?.fullName?.toLowerCase() || "";
      const city = o.shippingAddress?.city?.toLowerCase() || "";
      const address = o.shippingAddress?.address?.toLowerCase() || "";
      const orderId = o._id.toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch = !q || name.includes(q) || city.includes(q) || address.includes(q) || orderId.includes(q);

      return matchesPayment && matchesSearch;
    });
  }, [orders, paymentFilter, searchQuery]);

  // Reset to Page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [paymentFilter, searchQuery, itemsPerPage]);

  const totalItems = filteredPayments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  const renderPaymentBadge = (methodStr: string = "N/A") => {
    const method = methodStr.toLowerCase();
    if (method.includes("paypal")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
          PayPal
        </span>
      );
    }
    if (method.includes("cash")) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Cash App
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
        {methodStr.toUpperCase() || "COD"}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments & Transactions</h1>
          <p className="text-xs text-slate-500 mt-1">Track all order payments, addresses, and transaction methods</p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200">
          Total Matching: <span className="text-slate-900 font-bold">{totalItems}</span> transactions
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Order ID, Name, Address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1E3D]"
          />

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Show per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: "all", label: "All Payments" },
            { id: "paypal", label: "PayPal" },
            { id: "cashapp", label: "Cash App" },
            { id: "cod", label: "COD / Other" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPaymentFilter(item.id as PaymentFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                paymentFilter === item.id
                  ? "bg-[#0B1E3D] text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-400">Loading payment data...</div>
      ) : paginatedPayments.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium text-sm">No payment records found matching your query.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Shipping Address</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4 text-right">Order View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedPayments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/70">
                  <td className="p-4 font-mono text-xs font-bold text-slate-900">
                    #{p._id.slice(-8)}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">{p.shippingAddress?.fullName || "Guest User"}</p>
                    <p className="text-xs text-slate-400">{p.shippingAddress?.phone || "No Phone"}</p>
                  </td>
                  <td className="p-4 text-xs text-slate-600 max-w-xs">
                    <p className="font-medium text-slate-800">{p.shippingAddress?.address || "N/A"}</p>
                    <p className="text-slate-400">{p.shippingAddress?.city}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{formatPrice(p.total)}</td>
                  <td className="p-4">{renderPaymentBadge(p.paymentMethod)}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/orders/${p._id}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-[#0B1E3D] hover:bg-slate-100"
                    >
                      View Order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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