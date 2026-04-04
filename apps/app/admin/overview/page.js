"use client";
import { useState } from "react";
import { useRevenue } from "@/hooks/admin/useRevenue";
import { useDailySales } from "@/hooks/admin/useDailySales";
import { useAllOrders } from "@/hooks/admin/useAllOrders";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

const RANGES = [
  { label: "Today", value: "1d" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "All Time", value: "" },
];

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  trendValue,
}) {
  const isUp = trend === "up";
  return (
    <div className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-100 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={16} className="text-white" />
        </div>
        {trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}
          >
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-xl lg:text-2xl font-bold text-slate-900 mb-0.5">
        {value}
      </p>
      <p className="text-xs lg:text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

const STATUS_STYLES = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-500",
};

export default function Overview() {
  const [range, setRange] = useState("30d");
  const { data: revenue } = useRevenue(range);
  const { data: dailySales } = useDailySales(range);
  const { data: allOrders } = useAllOrders();

  const recentOrders = allOrders?.slice(0, 6) || [];
  const chartData = dailySales || [];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header + Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg lg:text-xl font-bold text-slate-900">
            Dashboard Overview
          </h2>
          <p className="text-sm text-slate-400">Track your store performance</p>
        </div>
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit overflow-x-auto">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
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

      {/* Stat Cards — 2 cols mobile, 4 cols xl */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${revenue?.current?.revenue?.toLocaleString() || "0"}`}
          subtitle="Selected period"
          icon={DollarSign}
          color="bg-blue-600"
          trend={revenue?.growth?.revenueGrowth >= 0 ? "up" : "down"}
          trendValue={`${revenue?.growth?.revenueGrowth >= 0 ? "+" : ""}${revenue?.growth?.revenueGrowth?.toFixed(1) || 0}%`}
        />
        <StatCard
          title="Total Orders"
          value={revenue?.current?.orders?.toLocaleString() || "0"}
          subtitle="Selected period"
          icon={ShoppingBag}
          color="bg-violet-500"
          trend={revenue?.growth?.ordersGrowth >= 0 ? "up" : "down"}
          trendValue={`${revenue?.growth?.ordersGrowth >= 0 ? "+" : ""}${revenue?.growth?.ordersGrowth?.toFixed(1) || 0}%`}
        />
        <StatCard
          title="Total Customers"
          value={
            allOrders
              ? [...new Set(allOrders.map((o) => o.user?._id))].length
              : "—"
          }
          subtitle="Unique buyers"
          icon={Users}
          color="bg-emerald-500"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${revenue?.current?.aov?.toFixed(0) || "0"}`}
          subtitle="Selected period"
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
        <div className="mb-4">
          <h2 className="font-bold text-slate-900">Revenue Overview</h2>
          <p className="text-sm text-slate-400">
            {RANGES.find((r) => r.value === range)?.label}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="_id"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
              formatter={(v) => [`$${v}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              dot={{ fill: "#2563eb", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders — cards on mobile, table on desktop */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
        <div className="mb-4">
          <h2 className="font-bold text-slate-900">Recent Orders</h2>
          <p className="text-sm text-slate-400">Latest 6 orders</p>
        </div>

        {/* Mobile cards */}
        <div className="block lg:hidden space-y-3">
          {recentOrders.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-8">
              No orders yet
            </p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
              >
                <div>
                  <p className="font-mono text-xs text-slate-600 font-semibold">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-sm text-slate-700">
                    {order.user?.name || "—"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-semibold text-slate-900 text-sm">
                    ${order.totalPrice?.toFixed(2)}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  "Order ID",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Status",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-slate-400 pb-3 pr-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-slate-400 text-sm"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition">
                    <td className="py-3 font-mono text-xs text-slate-600 pr-4">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 text-slate-700 pr-4">
                      {order.user?.name || "—"}
                    </td>
                    <td className="py-3 text-slate-500 pr-4">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 text-slate-600 pr-4">
                      {order.items?.length} item
                      {order.items?.length > 1 ? "s" : ""}
                    </td>
                    <td className="py-3 font-semibold text-slate-900 pr-4">
                      ${order.totalPrice?.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
