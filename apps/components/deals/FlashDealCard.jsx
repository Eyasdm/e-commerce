"use client";

import { useState } from "react";
import Link from "next/link";
import { CountdownTimer } from "@/components/deals/CountdownTimer";
import { Stars } from "@/lib/utils";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useRouter } from "next/navigation";
import { Loader2, Check, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export function FlashDealCard({ deal }) {
  const [added, setAdded] = useState(false);
  const { isAuthenticated } = useAuth();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: cart = [] } = useCart();
  const router = useRouter();

  const imageUrl = `${proccess.env.NEXT_PUBLIC_API_URL}${deal.image}`;
  const productId = deal.id || deal._id;

  const alreadyInCart = cart.some((item) => item.productId === productId);

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push("/auth");
      return;
    }

    if (alreadyInCart) {
      router.push("/cart");
      return;
    }

    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        },
      },
    );
  };

  const buttonContent = () => {
    if (alreadyInCart)
      return (
        <>
          <Check size={14} /> Go to Cart
        </>
      );
    if (isPending)
      return (
        <>
          <Loader2 size={14} className="animate-spin" /> Adding...
        </>
      );
    if (added)
      return (
        <>
          <Check size={14} /> Added!
        </>
      );
    return (
      <>
        <ShoppingCart size={14} /> Add to Cart
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
      {/* ✅ Clickable Area */}
      <Link href={`/shop/${productId}`} className="block">
        <div className="relative p-4 pb-2">
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
            {deal.discount}% OFF
          </span>

          <div className="h-36 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt={deal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="px-4">
          <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">
            {deal.name}
          </h3>
        </div>
      </Link>

      {/* باقي المحتوى */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={deal.rating} />
          <span className="text-xs text-slate-400">({deal.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-slate-900">
            ${deal.salePrice.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ${deal.originalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <CountdownTimer initialSeconds={deal.endsIn} small />
        </div>

        {/* ✅ Button */}
        <button
          onClick={handleAdd}
          disabled={isPending}
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 ${
            alreadyInCart
              ? "bg-green-600 hover:bg-green-700 text-white"
              : added
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {buttonContent()}
        </button>
      </div>
    </div>
  );
}
