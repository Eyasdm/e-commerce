"use client";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/lib/cart-store";
import { Recommended } from "../../components/cart/Recommended";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);

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
          {cart.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Order Summary */}
        <OrderSummary />
      </div>

      {/* Recommended */}
      <Recommended />
    </main>
  );
}
