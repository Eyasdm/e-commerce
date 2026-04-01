"use client";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
        <XCircle size={64} className="text-red-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Payment Cancelled
        </h1>
        <p className="text-slate-500 mb-8">
          Your payment was cancelled. Your cart has been saved — you can
          complete your purchase whenever you're ready.
        </p>
        <Link
          href="/cart"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Return to Cart
        </Link>
      </div>
    </main>
  );
}
