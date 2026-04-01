"use client";

// ── Generic shimmer base ────────────────────────────────────────────────────────
function Shimmer({ className = "" }) {
  return (
    <div className={`bg-slate-100 rounded-xl animate-pulse ${className}`} />
  );
}

// ── CartItem skeleton ──────────────────────────────────────────────────────────
export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-slate-100 shadow-sm">
      <Shimmer className="w-20 h-20 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/4" />
      </div>
      <Shimmer className="h-8 w-24 rounded-full" />
      <Shimmer className="h-5 w-14" />
      <Shimmer className="h-8 w-8 rounded-full" />
    </div>
  );
}

// ── Order summary skeleton ─────────────────────────────────────────────────────
export function OrderSummarySkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
      <Shimmer className="h-5 w-36" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <Shimmer className="h-4 w-24" />
          <Shimmer className="h-4 w-16" />
        </div>
      ))}
      <div className="h-px bg-slate-100" />
      <div className="flex justify-between">
        <Shimmer className="h-6 w-12" />
        <Shimmer className="h-6 w-20" />
      </div>
      <Shimmer className="h-11 w-full rounded-xl" />
      <Shimmer className="h-10 w-full rounded-xl" />
    </div>
  );
}
