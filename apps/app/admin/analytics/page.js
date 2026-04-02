"use client";
import { useState } from "react";
import { useDailySales } from "@/lib/hooks/admin/useDailySales";
import { useOrdersStats } from "@/lib/hooks/admin/useOrdersStats";
import { useTopProducts } from "@/lib/hooks/admin/useTopProducts";
import { useRevenue } from "@/lib/hooks/admin/useRevenue";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import TopProductsChart from "@/components/admin/analytics/TopProductsChart";
import OrderStatusChart from "@/components/admin/analytics/OrderStatusChart";
import RevenueGrowthChart from "@/components/admin/analytics/RevenueGrowthChart";

const RANGES = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "All Time", value: "" },
];

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-2xl p-4 border ${color}`}>
      <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-xl lg:text-2xl font-bold text-slate-900 leading-tight">
        {value}
      </p>
    </div>
  );
}

export default function Analytics() {
  const [range, setRange] = useState("30d");

  const { data: dailySales = [] } = useDailySales(range);
  const { data: ordersStats = [] } = useOrdersStats(range);
  const { data: topProducts = [] } = useTopProducts(range);
  const { data: revenue } = useRevenue(range);

  const totalOrders = ordersStats.reduce((acc, s) => acc + s.count, 0);
  const totalRevenue = revenue?.current?.revenue || 0;
  const avgOrder = revenue?.current?.aov || 0;
  const topProduct = topProducts[0];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header + Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900">
            Analytics
          </h2>
          <p className="text-sm text-slate-400">Store performance insights</p>
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                range === r.value
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards — 2 cols on mobile, 4 on xl */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        <SummaryCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          color="bg-blue-50 border-blue-100"
        />
        <SummaryCard
          label="Total Orders"
          value={totalOrders}
          color="bg-violet-50 border-violet-100"
        />
        <SummaryCard
          label="Avg Order Value"
          value={`$${avgOrder.toFixed(0)}`}
          color="bg-emerald-50 border-emerald-100"
        />
        <SummaryCard
          label="Top Product"
          value={topProduct?.name || "—"}
          color="bg-orange-50 border-orange-100"
        />
      </div>

      {/* Charts — 1 col on mobile, 2 on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <RevenueChart data={dailySales} />
        <TopProductsChart data={topProducts} />
        <OrderStatusChart data={ordersStats} />
        <RevenueGrowthChart data={dailySales} />
      </div>
    </div>
  );
}
