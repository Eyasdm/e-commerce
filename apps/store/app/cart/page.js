"use client";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Recommended } from "../../components/cart/Recommended";
import { useCart } from "@/lib/hooks/useCart";

export default function CartPage() {
  const { data: cart = [], isLoading, error } = useCart();

  {
    isLoading &&
      Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl" />
      ));
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground">Home / Cart</p>
      </div>

      {/* Cart Layout */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
        {/* Cart Items */}
        <div className="space-y-4">
          {isLoading && <p>Loading cart...</p>}

          {error && <p>Failed to load cart</p>}

          {!isLoading && cart.length === 0 && (
            <p className="text-muted-foreground">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <OrderSummary cart={cart} />
      </div>

      {/* Recommended */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
        <Recommended />
      </div>
    </main>
  );
}
