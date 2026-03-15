"use client";

import OrderCard from "@/components/orders/OrderCard";
import StatusFilter from "@/components/orders/StatusFilter";

export default function OrdersPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your purchases
          </p>
        </div>

        <StatusFilter />
      </div>

      {/* Orders */}
      <div className="space-y-6">
        <OrderCard
          id="TN-45821"
          date="25.02.24"
          status="Paid"
          total="90"
          payment="VISA •••• 4242"
        />

        <OrderCard
          id="TN-45822"
          date="30.02.24"
          status="Delivered"
          total="322"
          payment="Cash on Delivery"
        />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
        </div>

        <button className="px-5 py-2 border rounded-full">Load More</button>
      </div>
    </main>
  );
}
