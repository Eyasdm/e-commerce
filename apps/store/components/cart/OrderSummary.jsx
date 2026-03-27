"use client";

import { useState } from "react";
import { Lock, Tag, ChevronRight, ShieldCheck } from "lucide-react";

const SHIPPING = 5.0;
const TAX_RATE = 0.03; // ~3% estimated tax

export default function OrderSummary({ cart = [] }) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // ── Calculations ──────────────────────────────────────────────────
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discount = cart.reduce((acc, item) => {
    if (!item.discount) return acc;
    const original = item.oldPrice ?? item.price / (1 - item.discount / 100);
    return acc + (original - item.price) * item.quantity;
  }, 0);

  const promoDiscount = appliedPromo ? subtotal * 0.1 : 0; // 10% off for valid promo
  const tax = (subtotal - discount - promoDiscount) * TAX_RATE;
  const total = subtotal - discount - promoDiscount + SHIPPING + tax;

  // ── Promo handler ─────────────────────────────────────────────────
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setAppliedPromo(promoCode.trim().toUpperCase());
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const fmt = (n) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 w-full max-w-sm sticky top-24">
      {/* Header */}
      <h2 className="text-lg font-extrabold text-slate-900 mb-5 tracking-tight">
        Order Summary
      </h2>

      {/* Line items */}
      <div className="flex flex-col gap-3 mb-5">
        <Row label="Subtotal" value={`$${fmt(subtotal)}`} />

        {discount > 0 && (
          <Row
            label="Discount"
            value={`-$${fmt(discount)}`}
            valueClass="text-red-500 font-semibold"
          />
        )}

        {promoDiscount > 0 && (
          <Row
            label={`Promo (${appliedPromo})`}
            value={`-$${fmt(promoDiscount)}`}
            valueClass="text-emerald-600 font-semibold"
          />
        )}

        <Row label="Shipping" value={`$${fmt(SHIPPING)}`} />
        <Row label="Estimated Tax" value={`$${fmt(tax)}`} />
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mb-5" />

      {/* Total */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-base font-extrabold text-slate-900">Total</span>
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          ${fmt(total)}
        </span>
      </div>

      {/* Promo code */}
      <div className="mb-5">
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl overflow-hidden px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all bg-slate-50">
          <Tag size={15} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
          >
            Apply
          </button>
        </div>
        {promoError && (
          <p className="text-xs text-red-500 mt-1.5 ml-1">{promoError}</p>
        )}
        {appliedPromo && (
          <p className="text-xs text-emerald-600 mt-1.5 ml-1 font-medium">
            ✓ Promo applied — 10% off
          </p>
        )}
      </div>

      {/* CTA */}
      <button className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm tracking-wide shadow-[0_4px_18px_rgba(37,99,235,0.35)] hover:opacity-90 active:scale-[0.985] transition-all duration-150">
        <Lock size={15} />
        Proceed to Checkout
      </button>

      {/* Secure badge */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
        <ShieldCheck size={13} />
        <span>Secure checkout</span>
      </div>
    </div>
  );
}

// ── Helper ─────────────────────────────────────────────────────────────────────
function Row({ label, value, valueClass = "text-slate-700 font-medium" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm ${valueClass}`}>{value}</span>
    </div>
  );
}
