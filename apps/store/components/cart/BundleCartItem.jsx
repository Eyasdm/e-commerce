"use client";
import { Trash2, Loader2, Package } from "lucide-react";
import { useRemoveCartItem } from "@/lib/hooks/cart/useRemoveCartItem";
import toast from "react-hot-toast";

export default function BundleCartItem({ item }) {
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  const handleRemove = () => {
    removeItem({ itemId: item.id }); // use item._id not productId
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-blue-100 group transition-all hover:shadow-md">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
        <img
          src={`http://localhost:8000${item.image}`}
          alt={item.name}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md">
            BUNDLE
          </span>
        </div>
        <h3 className="font-semibold text-slate-900 text-sm truncate">
          {item.name}
        </h3>
        <p className="text-slate-900 font-bold text-sm mt-0.5">${item.price}</p>
      </div>

      {/* Qty — fixed at 1 for bundles */}
      <div className="shrink-0 text-sm text-slate-400 font-medium">Qty: 1</div>

      {/* Total */}
      <div className="text-right shrink-0 w-20">
        <p className="font-bold text-slate-900 text-base">${item.price}</p>
      </div>

      {/* Delete */}
      <button
        onClick={handleRemove}
        disabled={isRemoving}
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
