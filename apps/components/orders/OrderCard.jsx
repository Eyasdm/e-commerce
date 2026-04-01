"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";

export default function OrderCard({ order, statusColors }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const statusClass =
    statusColors[order.status] || "bg-slate-100 text-slate-600";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5">
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Order ID</p>
          <p className="font-bold text-slate-900 text-sm">
            #{order._id.slice(-8).toUpperCase()}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{date}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusClass}`}
        >
          {order.status}
        </span>
      </div>

      {/* Product images */}
      <div className="flex gap-2 mb-4">
        {order.items.slice(0, 5).map((item, i) => (
          <div
            key={i}
            className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden shrink-0 relative"
          >
            <Image
              src={`${proccess.env.NEXT_PUBLIC_API_URL}${item.image}`}
              alt={item.name}
              fill
              className="object-contain "
            />
          </div>
        ))}
        {order.items.length > 5 && (
          <div className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-400 shrink-0">
            +{order.items.length - 5}
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div>
          <p className="text-xs text-slate-400">
            {order.items.length} item{order.items.length > 1 ? "s" : ""}
            {order.paymentMethod === "stripe" && (
              <span className="ml-2 text-slate-300">· Paid via Stripe</span>
            )}
          </p>
          <p className="font-bold text-slate-900 mt-0.5">
            ${order.totalPrice.toFixed(2)}
          </p>
        </div>

        <Link
          href={`/orders/${order._id}`}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-all"
        >
          View Details <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
