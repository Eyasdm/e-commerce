"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useUpdateCartItem } from "@/lib/hooks/cart/useUpdateCartItem";
import { useRemoveCartItem } from "@/lib/hooks/cart/useRemoveCartItem";
import BundleCartItem from "./BundleCartItem";

export default function CartItem({ item }) {
  if (item.isBundle) return <BundleCartItem item={item} />;

  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}${item.image}`;
  const total = item.price * item.quantity;
  const hasDiscount = item.discount && item.discount > 0;
  const originalPrice = hasDiscount
    ? Math.round(item.price / (1 - item.discount / 100))
    : null;

  const busy = isUpdating || isRemoving;

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateItem({ productId: item.productId, quantity: item.quantity + 1 });
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (item.quantity <= 1) removeItem(item.productId);
    else updateItem({ productId: item.productId, quantity: item.quantity - 1 });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeItem(item.productId);
  };

  return (
    <div
      className={`bg-white rounded-2xl px-4 py-4 shadow-sm border border-slate-100 transition-all hover:shadow-md ${busy ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex gap-3">
        {/* Image */}
        <Link href={`/shop/${item.productId}`} className="shrink-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50">
            <Image
              src={imageUrl}
              alt={item.name}
              fill
              className="object-contain p-1"
            />
            {hasDiscount && (
              <span className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-md leading-none">
                {item.discount}% OFF
              </span>
            )}
          </div>
        </Link>

        {/* Info + controls */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Top row: name + delete */}
          <div className="flex items-start justify-between gap-2">
            <Link href={`/shop/${item.productId}`}>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-blue-600 transition">
                {item.name}
              </h3>
            </Link>
            <button
              onClick={handleRemove}
              disabled={busy}
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              {isRemoving ? (
                <Loader2 size={13} className="animate-spin text-red-400" />
              ) : (
                <Trash2 size={13} />
              )}
            </button>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-900 font-bold text-sm">
              ${item.price}
            </span>
            {hasDiscount && (
              <span className="text-slate-400 text-xs line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Bottom row: quantity + total */}
          <div className="flex items-center justify-between mt-2">
            {/* Quantity */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleDecrease}
                disabled={busy}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-40"
              >
                {isUpdating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Minus size={11} />
                )}
              </button>
              <span className="w-5 text-center text-sm font-semibold text-slate-900">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={busy}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-40"
              >
                {isUpdating ? (
                  <Loader2 size={11} className="animate-spin" />
                ) : (
                  <Plus size={11} />
                )}
              </button>
            </div>

            {/* Line total */}
            <div className="text-right">
              <p className="font-bold text-slate-900 text-sm">${total}</p>
              {hasDiscount && item.quantity > 1 && (
                <p className="text-xs text-slate-400 line-through">
                  ${originalPrice * item.quantity}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
