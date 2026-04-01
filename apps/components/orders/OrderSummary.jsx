"use client";
import { useCheckout } from "@/lib/hooks/useCheckout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderSummary({ cart }) {
  console.log("OrderSummary cart:", cart);
  const { mutate: checkout, isPending } = useCheckout();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = cart.reduce((acc, item) => {
    if (!item.discount) return acc;
    const original = Math.round(item.price / (1 - item.discount / 100));
    return acc + (original - item.price) * item.quantity;
  }, 0);
  const shipping = cart.length > 0 ? 5 : 0;
  const tax = subtotal * 0.025;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    console.log("cart:", cart);
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      router.push("/auth");
      return;
    }
    // if (cart.length === 0) {
    //   toast.error("Your cart is empty");
    //   return;
    // }
    checkout();
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit sticky top-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-slate-900 text-base pt-3 border-t border-slate-100">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={isPending || cart.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            <Lock size={16} /> Proceed to Checkout
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
        <Lock size={11} /> Secure checkout powered by Stripe
      </p>
    </div>
  );
}
