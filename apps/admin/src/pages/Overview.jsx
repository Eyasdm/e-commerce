import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
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

// ── Stat Card ─────────────────────────────────────────────────────────────────
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
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon size={18} className="text-white" />
        </div>
        {trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
            }`}
          >
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-0.5">{value}</p>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-500",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

// ── Overview Page ─────────────────────────────────────────────────────────────
export default function Overview() {
  const { data: revenue } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const res = await api.get("/admin/analytics/revenue");
      return res.data.data;
    },
  });

  const { data: orders } = useQuery({
    queryKey: ["admin-orders-stats"],
    queryFn: async () => {
      const res = await api.get("/admin/analytics/orders");
      return res.data.data;
    },
  });

  const { data: dailySales } = useQuery({
    queryKey: ["admin-daily-sales"],
    queryFn: async () => {
      const res = await api.get("/admin/analytics/daily-sales");
      return res.data.data;
    },
  });

  const { data: allOrders } = useQuery({
    queryKey: ["admin-all-orders"],
    queryFn: async () => {
      const res = await api.get("/orders/admin");
      return res.data.data;
    },
  });

  const recentOrders = allOrders?.slice(0, 6) || [];
  const chartData = dailySales?.slice(-7) || [];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${revenue?.totalRevenue?.toLocaleString() || "0"}`}
          subtitle="All time revenue"
          icon={DollarSign}
          color="bg-blue-600"
          trend="up"
          trendValue={`+${revenue?.growthRate || 0}%`}
        />
        <StatCard
          title="Total Orders"
          value={orders?.total?.toLocaleString() || "0"}
          subtitle="All time orders"
          icon={ShoppingBag}
          color="bg-violet-500"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Total Users"
          value={revenue?.totalUsers?.toLocaleString() || "0"}
          subtitle="Registered accounts"
          icon={Users}
          color="bg-emerald-500"
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${revenue?.avgOrderValue?.toFixed(0) || "0"}`}
          subtitle="Per order average"
          icon={TrendingUp}
          color="bg-orange-500"
          trend="up"
          trendValue="+3%"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-slate-900">Revenue Overview</h2>
            <p className="text-sm text-slate-400">Last 7 days</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
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
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "13px",
              }}
              formatter={(v) => [`$${v}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#colorRevenue)"
              dot={{ fill: "#2563eb", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-slate-900">Recent Orders</h2>
            <p className="text-sm text-slate-400">Latest 6 orders</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-400 pb-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 pb-3">
                  Date
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 pb-3">
                  Items
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 pb-3">
                  Total
                </th>
                <th className="text-left text-xs font-semibold text-slate-400 pb-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-400 text-sm"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition">
                    <td className="py-3 font-mono text-xs text-slate-600">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3 text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 text-slate-600">
                      {order.items?.length} item
                      {order.items?.length > 1 ? "s" : ""}
                    </td>
                    <td className="py-3 font-semibold text-slate-900">
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
