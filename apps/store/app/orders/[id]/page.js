"use client";

import OrderTimeline from "@/components/orders/OrderTimeline";
import OrderItem from "@/components/orders/OrderItem";
import OrderSummary from "@/components/orders/OrderSummary";
import PaymentInfo from "@/components/orders/PaymentInfo";
import ShippingInfo from "@/components/orders/ShippingInfo";

export default function OrderDetailsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <h1 className="text-2xl font-bold">Order Details</h1>

        <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
          #TN-45821
        </span>

        <span className="text-gray-500">Paid</span>
        <span className="text-gray-500">Shipped</span>
        <span className="text-gray-400">Delivered</span>
      </div>

      {/* Timeline */}
      <OrderTimeline />

      {/* Layout */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-10">
        {/* Order Items */}
        <div className="space-y-6">
          <OrderItem
            image="/products/phone.png"
            name="Product Detail"
            price="310"
            qty="1"
            total="380"
          />

          <OrderItem
            image="/products/watch.png"
            name="Product Deliver"
            price="380"
            qty="1"
            total="280"
          />

          <OrderItem
            image="/products/camera.png"
            name="Product Detail"
            price="380"
            qty="1"
            total="280"
          />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <OrderSummary />

          <PaymentInfo />

          <ShippingInfo />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-10">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-full">
          Track Shipment
        </button>

        <button className="px-6 py-3 border rounded-full">
          Download Invoice
        </button>
      </div>
    </main>
  );
}
