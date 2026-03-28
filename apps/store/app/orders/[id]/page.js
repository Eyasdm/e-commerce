"use client";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/lib/hooks/useOrder";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Package,
  Truck,
  Home,
} from "lucide-react";

const STATUS_STEPS = ["pending", "paid", "shipped", "delivered"];

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

const STEP_LABELS = {
  pending: "Order Placed",
  paid: "Payment Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

const STEP_ICONS = [Package, CheckCircle2, Truck, Home];

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading)
    return (
      <main className="max-w-5xl mx-auto px-6 py-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </main>
    );

  if (error || !order)
    return (
      <main className="max-w-5xl mx-auto px-6 py-10">
        <p className="text-red-500">Order not found.</p>
      </main>
    );

  const currentStep = STATUS_STEPS.indexOf(order.status);
  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const shortId = order._id.slice(-8).toUpperCase();
  const subtotal = order.items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0,
  );
  const shipping = 5;
  const tax = subtotal * 0.025;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Order Details</h1>
          <p className="text-slate-400 text-sm">
            #{shortId} · {date}
          </p>
        </div>
        <span
          className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"}`}
        >
          {order.status}
        </span>
      </div>

      {/* Progress tracker */}
      {order.status !== "cancelled" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="relative flex items-center justify-between">
            {/* Track line */}
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-100 z-0" />
            <div
              className="absolute left-0 top-5 h-0.5 bg-blue-500 z-0 transition-all duration-500"
              style={{
                width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%`,
              }}
            />

            {STATUS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const done = i <= currentStep;
              return (
                <div
                  key={step}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      done
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`text-xs font-medium ${done ? "text-slate-800" : "text-slate-400"}`}
                  >
                    {STEP_LABELS[step]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Items */}
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4"
            >
              <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 shrink-0 overflow-hidden">
                <Image
                  src={`http://localhost:8000${item.image}`}
                  alt={item.name}
                  fill
                  className="object-contain "
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">
                  {item.name}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-slate-400 text-xs">${item.price} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-blue-600" />
              <h3 className="font-bold text-slate-900">Order Summary</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-100">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <h3 className="font-bold text-slate-900">Payment</h3>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="capitalize font-medium">
                {order.paymentMethod}
              </span>
              {order.isPaid && order.paidAt && (
                <span className="text-slate-400 text-xs">
                  ·{" "}
                  {new Date(order.paidAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex gap-3 mt-6">
        <Link
          href="/orders"
          className="flex-1 text-center border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all text-sm"
        >
          Back to Orders
        </Link>
        <Link
          href="/shop"
          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
