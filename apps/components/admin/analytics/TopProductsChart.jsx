import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-md px-4 py-3 text-xs">
      <p className="font-bold text-slate-800 mb-1">{d.name}</p>
      {d.brand && <p className="text-slate-400 mb-2">{d.brand}</p>}
      <p className="text-blue-600 font-semibold">{d.sold} units sold</p>
      <p className="text-slate-500">${d.revenue?.toFixed(2)} revenue</p>
    </div>
  );
};

export default function TopProductsChart({ data = [] }) {
  const formatted = data.slice(0, 5).map((item) => ({
    // name now comes from the backend $lookup — falls back gracefully
    name: item.name || `#${item._id?.toString().slice(-6)}`,
    brand: item.brand || "",
    sold: item.totalSold,
    revenue: item.revenue,
  }));

  if (formatted.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center justify-center h-72.5">
        <p className="text-sm text-slate-400">No product data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-1">Top Products</h3>
      <p className="text-xs text-slate-400 mb-5">By units sold</p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={formatted}
          layout="vertical"
          margin={{ left: 8, right: 16 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={130}
            // Truncate long names with ellipsis
            tickFormatter={(v) => (v.length > 18 ? v.slice(0, 18) + "…" : v)}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar dataKey="sold" radius={[0, 6, 6, 0]}>
            {formatted.map((_, i) => (
              <Cell key={i} fill={COLORS[i] ?? COLORS[COLORS.length - 1]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
