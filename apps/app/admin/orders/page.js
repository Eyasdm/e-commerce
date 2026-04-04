"use client";
import { useState } from "react";
import { useAllOrders } from "@/hooks/admin/useAllOrders";
import { Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { StatusDropdown } from "@/components/admin/ui/StatusDropdown";

const STATUSES = [
  "all",
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { data: orders = [], isLoading } = useAllOrders();

  const filtered = orders.filter((order) => {
    const matchStatus = filter === "all" || order.status === filter;
    const matchSearch =
      order._id.slice(-8).toLowerCase().includes(search.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900">
            Orders
          </h2>
          <p className="text-sm text-slate-400">{orders.length} total orders</p>
        </div>
        <input
          type="text"
          placeholder="Search by ID or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400 transition w-full sm:w-64"
        />
      </div>

      {/* Filter tabs — scrollable on mobile */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit min-w-full sm:min-w-0">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                filter === s
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile cards view */}
      <div className="block lg:hidden space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={24} className="animate-spin text-slate-300" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-12">
            No orders found
          </p>
        ) : (
          filtered.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-600 font-semibold">
                  #{order._id.slice(-8).toUpperCase()}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {order.user?.name || "—"}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {order.user?.email || "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    ${order.totalPrice?.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {order.items?.length} item
                    {order.items?.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                <p className="text-xs text-slate-400">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <StatusDropdown
                  orderId={order._id}
                  currentStatus={order.status}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Payment",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-slate-400 px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <Loader2
                      size={24}
                      className="animate-spin text-slate-300 mx-auto"
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-slate-400 text-sm"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800 text-xs">
                        {order.user?.name || "—"}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {order.user?.email || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {order.items?.length} item
                      {order.items?.length > 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 capitalize">
                      {order.paymentMethod || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusDropdown
                        orderId={order._id}
                        currentStatus={order.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
            Showing {filtered.length} of {orders.length} orders
          </div>
        )}
      </div>
    </div>
  );
}
