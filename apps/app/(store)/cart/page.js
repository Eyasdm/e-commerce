"use client";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Recommended } from "@/components/cart/Recommended";
import { useCart } from "@/lib/hooks/cart/useCart";
import PageLoader from "@/components/PageLoader";
import { PageError } from "@/components/ErrorStates";
import { CartItemSkeleton, OrderSummarySkeleton } from "@/components/Skeletons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CartSkeleton() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="h-8 w-40 bg-slate-100 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-24 bg-slate-100 rounded animate-pulse" />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
        <OrderSummarySkeleton />
      </div>
    </main>
  );
}

export default function CartPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const { data: cart = [], isLoading, isError, error, refetch } = useCart();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth");
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || (!isAuthenticated && !authLoading))
    return <CartSkeleton />;

  if (isLoading) {
    return (
      <>
        <PageLoader isLoading={true} />
        <CartSkeleton />
      </>
    );
  }

  if (isError) return <PageError error={error} onRetry={refetch} />;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground text-sm">Home / Cart</p>
      </div>

      {/* Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 lg:gap-10">
        {/* Cart items first on mobile */}
        <div className="space-y-4 order-1">
          {cart.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            cart.map((item, i) => <CartItem key={item.id || i} item={item} />)
          )}
        </div>

        {/* Order summary below items on mobile, not sticky */}
        <div className="order-2 lg:order-2">
          <OrderSummary cart={cart} />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
        <Recommended />
      </div>
    </main>
  );
}
