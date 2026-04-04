"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { CART_KEY } from "@/hooks/cart/useCart";
import Link from "next/link";

export default function SuccessPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    //  Clear cart cache since backend already cleared it
    queryClient.invalidateQueries({ queryKey: CART_KEY });
  }, []);

  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-slate-500 mb-8">
          Thank you for your purchase. Your order has been placed and is being
          processed. You'll receive a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <Link
            href="/orders"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="block w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
