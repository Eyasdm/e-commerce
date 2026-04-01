"use client";

import OrderSummaryCard from "@/components/orders/OrderSummaryCard";

export default function OrderConfirmedPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>

        <p className="text-gray-500">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="mt-4 inline-block px-4 py-2 border rounded-full text-sm font-medium">
          #TN-45821
        </div>
      </div>

      {/* Order Card */}
      <OrderSummaryCard />
    </main>
  );
}
