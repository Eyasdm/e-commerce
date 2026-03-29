import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#f0f2f5] flex items-center">
      <div className="max-w-7xl mx-auto px-8 w-full grid lg:grid-cols-2 gap-10 items-center py-16">
        {/* ── Left: text + actions ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-3">
              404 – Page Not Found
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Oops! The page you're looking
              <br />
              for doesn't exist or has been moved
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all text-sm shadow-[0_4px_14px_rgba(37,99,235,0.35)] active:scale-95"
            >
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-slate-300 hover:border-slate-400 text-slate-800 font-semibold rounded-full transition-all text-sm bg-white active:scale-95"
            >
              Browse Products
            </Link>
          </div>

          {/* Search bar */}
          <form
            action="/shop"
            method="GET"
            className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-4 py-3 w-full max-w-sm shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/10 transition-all"
          >
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </form>
        </div>

        <div></div>
      </div>
    </main>
  );
}
