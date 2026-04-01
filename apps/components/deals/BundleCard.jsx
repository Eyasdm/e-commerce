"use client";
import { useAddBundleToCart } from "@/lib/hooks/cart/useAddBundleToCart";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useRouter } from "next/navigation";
import { Loader2, ShoppingCart, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export function BundleCard({ bundle }) {
  const { isAuthenticated } = useAuth();
  const { mutate: addBundle, isPending } = useAddBundleToCart();
  const { data: cart = [] } = useCart();
  const router = useRouter();

  const bundleId = bundle.id || bundle._id;
  const alreadyInCart = cart.some(
    (item) =>
      item.isBundle && item.bundleId?.toString() === bundleId?.toString(),
  );
  const handleGrabBundle = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push("/auth");
      return;
    }
    if (alreadyInCart) {
      router.push("/cart");
      return;
    }
    addBundle(bundleId);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all">
      {/* Image */}
      <div className="relative w-16 h-16 rounded-xl bg-slate-50 shrink-0 overflow-hidden">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${bundle.image}`}
          alt={bundle.name}
          className="w-full h-full object-contain "
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-900 text-sm truncate">
          {bundle.name}
        </p>
        <p className="text-xs text-slate-400 truncate">{bundle.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-slate-900">
            ${bundle.bundlePrice}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ${bundle.originalPrice}
          </span>
          <span className="text-xs font-bold text-green-600">
            Save ${bundle.savings}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleGrabBundle}
        disabled={isPending}
        className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 disabled:opacity-60 ${
          alreadyInCart
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Adding...
          </>
        ) : alreadyInCart ? (
          <>
            <ChevronRight size={14} /> Go to Cart
          </>
        ) : (
          <>
            <ShoppingCart size={14} /> Grab Bundle
          </>
        )}
      </button>
    </div>
  );
}
