"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useUpdateCartItem } from "@/lib/hooks/cart/useUpdateCartItem";
import { useRemoveCartItem } from "@/lib/hooks/cart/useRemoveCartItem";
import BundleCartItem from "./BundleCartItem";

export default function CartItem({ item }) {
  if (item.isBundle) {
    return <BundleCartItem item={item} />;
  }

  const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  const imageUrl = `${process.env.NEXT_BASE_API_URL}${item.image}`;
  const total = item.price * item.quantity;
  const hasDiscount = item.discount && item.discount > 0;
  const originalPrice = hasDiscount
    ? Math.round(item.price / (1 - item.discount / 100))
    : null;

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateItem({ productId: item.productId, quantity: item.quantity + 1 });
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (item.quantity <= 1) {
      removeItem(item.productId);
    } else {
      updateItem({ productId: item.productId, quantity: item.quantity - 1 });
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeItem(item.productId);
  };

  const busy = isUpdating || isRemoving;

  return (
    <div
      className={`flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 group transition-all hover:shadow-md ${
        busy ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* ✅ Clickable Image */}
      <Link href={`/shop/${item.productId}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className="object-contain p-1"
          />
          {hasDiscount && (
            <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
              {item.discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* ✅ Clickable Name */}
      <div className="flex-1 min-w-0">
        <Link href={`/shop/${item.productId}`}>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug truncate pr-2 hover:text-blue-600 transition">
            {item.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          {item.isBundle && (
            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md">
              BUNDLE
            </span>
          )}
          <span className="text-slate-900 font-bold text-sm">
            ${item.price}
          </span>
          {hasDiscount && (
            <span className="text-slate-400 text-xs line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleDecrease}
          disabled={busy}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-40"
        >
          {isUpdating ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Minus size={13} />
          )}
        </button>

        <span className="w-6 text-center text-sm font-semibold text-slate-900">
          {item.quantity}
        </span>

        <button
          onClick={handleIncrease}
          disabled={busy}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all disabled:opacity-40"
        >
          {isUpdating ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Plus size={13} />
          )}
        </button>
      </div>

      {/* Line total */}
      <div className="text-right shrink-0 w-20">
        <p className="font-bold text-slate-900 text-base">${total}</p>
        {hasDiscount && item.quantity > 1 && (
          <p className="text-xs text-slate-400 line-through">
            ${originalPrice * item.quantity}
          </p>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={handleRemove}
        disabled={busy}
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-40"
      >
        {isRemoving ? (
          <Loader2 size={15} className="animate-spin text-red-400" />
        ) : (
          <Trash2 size={15} />
        )}
      </button>
    </div>
  );
}
