import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  paid: "#22c55e",
  pending: "#eab308",
  shipped: "#3b82f6",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

export default function OrderStatusChart({ data = [] }) {
  const formatted = data.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-1">Order Status</h3>
      <p className="text-xs text-slate-400 mb-5">Breakdown by status</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={formatted}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {formatted.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
            formatter={(v, name) => [v, name]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  textTransform: "capitalize",
                }}
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
