"use client";

import { useState } from "react";
import { useMyOrders } from "@/hooks/useOrders";
import OrderCard from "@/components/orders/OrderCard";
import { QueryError } from "@/components/ErrorStates";
import { Package } from "lucide-react";
import Link from "next/link";

const STATUSES = [
  "All",
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

// ── Skeleton ───────────────────────────────────────────────────────────────────
function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-slate-100 rounded" />
          <div className="h-3 w-24 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-20 bg-slate-100 rounded-full" />
      </div>
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-14 h-14 bg-slate-100 rounded-xl shrink-0" />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
        <div className="h-4 w-28 bg-slate-100 rounded" />
        <div className="h-8 w-24 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useMyOrders();

  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
        <p className="text-slate-500 mt-1">Track and manage your purchases</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
              filter === s
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ── Loading ─────────────────────────────────────────────────────────── */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Error ───────────────────────────────────────────────────────────── */}
      {isError && !isLoading && <QueryError error={error} onRetry={refetch} />}

      {/* ── Empty state ─────────────────────────────────────────────────────── */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center py-20">
          <Package size={56} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-lg font-medium">No orders found</p>
          <p className="text-slate-400 text-sm mb-6">
            {filter === "All"
              ? "You haven't placed any orders yet."
              : `No ${filter} orders.`}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* ── Orders ──────────────────────────────────────────────────────────── */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              statusColors={STATUS_COLORS}
            />
          ))}
        </div>
      )}
    </main>
  );
}
