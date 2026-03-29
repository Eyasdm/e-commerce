"use client";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Recommended } from "@/components/cart/Recommended";
import { useCart } from "@/lib/hooks/cart/useCart";
import PageLoader from "@/components/PageLoader";
import { PageError } from "@/components/ErrorStates";
import { CartItemSkeleton, OrderSummarySkeleton } from "@/components/Skeletons";

export default function CartPage() {
  const { data: cart = [], isLoading, isError, error, refetch } = useCart();

  // ── Full-screen branded loader on first fetch ────────────────────────────────
  if (isLoading) {
    return (
      <>
        <PageLoader isLoading={true} />

        {/* Skeleton layout underneath so there's no jump when data arrives */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-10">
            <div className="h-8 w-40 bg-slate-100 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
            <OrderSummarySkeleton />
          </div>
        </main>
      </>
    );
  }

  // ── Page-level error ─────────────────────────────────────────────────────────
  if (isError) {
    return <PageError error={error} onRetry={refetch} />;
  }

  // ── Happy path ───────────────────────────────────────────────────────────────
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
            cart.map((item, i) => <CartItem key={item.id || i} item={item} />)
          )}
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
