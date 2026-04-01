"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Loader2, Check } from "lucide-react";
import { useAddToCart } from "@/lib/hooks/cart/useAddToCart";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/lib/hooks/cart/useCart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductCard({
  _id,
  image,
  name,
  price,
  oldPrice,
  rating = 4,
  reviews = 109,
  discount,
}) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${image}`;
  const { isAuthenticated } = useAuth();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: cart = [] } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  // ✅ Check if already in cart
  const alreadyInCart = cart.some((item) => item.productId === _id);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔥 prevent link click
    e.preventDefault(); // 🔥 prevent navigation

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
      { productId: _id, quantity: 1 },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        },
      },
    );
  };

  // ✅ Button label logic
  const renderButton = () => {
    if (alreadyInCart) {
      return (
        <>
          <Check size={16} />
          Go to Cart
        </>
      );
    }
    if (isPending) {
      return (
        <>
          <Loader2 size={16} className="animate-spin" />
          Adding...
        </>
      );
    }
    if (added) {
      return (
        <>
          <Check size={16} />
          Added!
        </>
      );
    }
    return (
      <>
        <ShoppingCart size={16} />
        Add to Cart
      </>
    );
  };

  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* ✅ Discount Badge */}
      {Number(discount) > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {discount}% OFF
        </div>
      )}

      {/* ✅ Clickable Area (Image + Title only) */}
      <Link href={`/shop/${_id}`} className="block">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            fill
            className="object-cover rounded-xl"
            alt={name}
          />
        </div>

        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 min-h-10 mt-3">
          {name}
        </h3>
      </Link>

      {/* ⭐ Rating */}
      <div className="flex items-center gap-1 mt-2 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "#facc15" : "none"}
            stroke="#facc15"
          />
        ))}
        <span className="text-xs text-gray-500 ml-2">({reviews})</span>
      </div>

      {/* 💰 Price */}
      <div className="mt-3 flex items-center gap-2">
        {oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            ${oldPrice}
          </span>
        )}
        <span className="text-lg font-bold text-gray-900">${price}</span>
      </div>

      {/* 🛒 Button */}
      <Button
        onClick={handleAddToCart}
        disabled={isPending}
        className={`mt-auto w-full rounded-full flex items-center justify-center gap-2 transition-all ${
          alreadyInCart
            ? "bg-green-600 hover:bg-green-700"
            : added
              ? "bg-green-500 hover:bg-green-600"
              : ""
        }`}
      >
        {renderButton()}
      </Button>
    </div>
  );
}
