"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

interface DashboardProps {
  stats: {
    totalProducts: number;
    inStockProducts: number;
    outOfStockProducts: number;
    totalUsers: number;
    todayRevenue: number;
    todayOrdersCount: number;
    last12hOrdersCount: number;
    last24hOrdersCount: number;
    totalRevenue: number;
    totalOrdersCount: number;
  };
  rawOrders: any[];
}

export default function DashboardClient({ stats, rawOrders }: DashboardProps) {
  // Date Filter State
  const [dateFilter, setDateFilter] = useState<"today" | "7days" | "30days" | "thisMonth" | "all" | "custom">("all");
  const [customMonth, setCustomMonth] = useState("");

  // Filter Orders based on Date Range
  const filteredData = useMemo(() => {
    const now = new Date();
    
    return rawOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      if (dateFilter === "today") {
        return orderDate.toDateString() === now.toDateString();
      }
      if (dateFilter === "7days") {
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= sevenDaysAgo;
      }
      if (dateFilter === "30days") {
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orderDate >= thirtyDaysAgo;
      }
      if (dateFilter === "thisMonth") {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      }
      if (dateFilter === "custom" && customMonth) {
        // customMonth string format: "YYYY-MM"
        const [year, month] = customMonth.split("-");
        return (
          orderDate.getFullYear() === Number(year) &&
          orderDate.getMonth() + 1 === Number(month)
        );
      }
      return true; // "all"
    });
  }, [rawOrders, dateFilter, customMonth]);

  // Calculate earnings for filtered duration
  const filteredRevenue = useMemo(() => {
    return filteredData.reduce((sum, o) => sum + (o.total || 0), 0);
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time store statistics and operational overview</p>
        </div>
      </div>

      {/* ================= TOP KEY STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Earning */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Revenue</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2">{formatPrice(stats.todayRevenue)}</h3>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">From {stats.todayOrdersCount} orders placed today</p>
        </div>

        {/* Total Gross Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Lifetime Revenue</p>
          <h3 className="text-2xl font-bold text-[#0B1E3D] mt-2">{formatPrice(stats.totalRevenue)}</h3>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">{stats.totalOrdersCount} total lifetime orders</p>
        </div>

        {/* Stock Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Inventory Status</p>
          <div className="flex items-baseline gap-2 mt-2">
            <h3 className="text-2xl font-bold text-slate-900">{stats.totalProducts}</h3>
            <span className="text-xs text-slate-500 font-medium">Total Products</span>
          </div>
          <div className="flex gap-3 text-[11px] font-semibold mt-2">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">In Stock: {stats.inStockProducts}</span>
            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Out: {stats.outOfStockProducts}</span>
          </div>
        </div>

        {/* Total Registered Users */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.totalUsers}</h3>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Registered customer accounts</p>
        </div>

      </div>

      {/* ================= TIME BASED ORDERS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-5 rounded-xl shadow-md border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Real-Time Stats</span>
          <h4 className="text-lg font-bold mt-1">Last 12 Hours</h4>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{stats.last12hOrdersCount}</span>
            <span className="text-xs text-slate-400">New Orders</span>
          </div>
        </div>

        <div className="bg-[#0B1E3D] text-white p-5 rounded-xl shadow-md border border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">Real-Time Stats</span>
          <h4 className="text-lg font-bold mt-1">Last 24 Hours</h4>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{stats.last24hOrdersCount}</span>
            <span className="text-xs text-slate-400">New Orders</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white p-5 rounded-xl shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-100">Performance</span>
          <h4 className="text-lg font-bold mt-1">Today's Orders</h4>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{stats.todayOrdersCount}</span>
            <span className="text-xs text-amber-100">Placed Today</span>
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC DATE & MONTH FILTER SECTION ================= */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Custom Sales & Analytics Filter</h3>
            <p className="text-xs text-slate-500">Select period or specific month to analyze order volume and earnings</p>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All Time" },
              { id: "today", label: "Today" },
              { id: "7days", label: "7 Days" },
              { id: "30days", label: "30 Days" },
              { id: "thisMonth", label: "This Month" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  setDateFilter(btn.id as any);
                  setCustomMonth("");
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  dateFilter === btn.id
                    ? "bg-[#0B1E3D] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Month Picker Selector */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs font-bold text-slate-600">Or Select Specific Month:</span>
          <input
            type="month"
            value={customMonth}
            onChange={(e) => {
              setCustomMonth(e.target.value);
              setDateFilter("custom");
            }}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E3D]"
          />
        </div>

        {/* Filter Summary Banner */}
        <div className="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200/60">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Filtered Period Summary</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">
              Showing Data for: <span className="text-[#0B1E3D]">{dateFilter === "custom" ? customMonth : dateFilter.toUpperCase()}</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Orders Count</p>
              <p className="text-lg font-extrabold text-slate-900">{filteredData.length}</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total Revenue</p>
              <p className="text-lg font-extrabold text-emerald-600">{formatPrice(filteredRevenue)}</p>
            </div>
          </div>
        </div>

        {/* Filtered Orders Table Preview */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 text-xs uppercase font-semibold">
              <tr>
                <th className="p-3 rounded-l-lg">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400 text-xs">
                    No orders found for the selected time duration.
                  </td>
                </tr>
              ) : (
                filteredData.slice(0, 5).map((ord) => (
                  <tr key={ord._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono text-xs font-bold text-slate-900">#{ord._id.slice(-8)}</td>
                    <td className="p-3 text-xs font-medium text-slate-800">{ord.shippingAddress?.fullName || "Guest"}</td>
                    <td className="p-3 text-xs text-slate-500">{new Date(ord.createdAt).toLocaleString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[11px] rounded font-semibold bg-amber-50 text-amber-700 capitalize">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs font-bold text-right text-slate-900">{formatPrice(ord.total)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filteredData.length > 5 && (
            <div className="pt-3 text-right">
              <Link href="/admin/orders" className="text-xs font-bold text-[#0B1E3D] hover:underline">
                View all {filteredData.length} filtered orders →
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}