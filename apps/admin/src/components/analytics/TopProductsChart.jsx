import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TopProductsChart({ data = [] }) {
  const formatted = data.slice(0, 5).map((item) => ({
    name: item.name || item._id?.toString().slice(-6) || "Unknown",
    sold: item.totalSold,
    revenue: item.revenue,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-1">Top Products</h3>
      <p className="text-xs text-slate-400 mb-5">By units sold</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={formatted} layout="vertical">
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
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
            formatter={(v) => [v, "Units Sold"]}
          />
          <Bar dataKey="sold" fill="#2563eb" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
