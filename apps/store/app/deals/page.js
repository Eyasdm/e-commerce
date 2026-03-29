"use client";

import { FlashDealCard } from "../../components/deals/FlashDealCard";
import { BundleCard } from "../../components/deals/BundleCard";
import { useBundles } from "@/lib/hooks/useBundles";
import { useDealsProducts } from "@/lib/hooks/useDealsProducts";
import { DealHeroBlueBanner } from "../../components/deals/DealHeroBlueBanner";
import TopDealBanner from "@/components/deals/TopDealBanner";
import { QueryError } from "@/components/ErrorStates";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Headphones", image: "/products/headphone.png", slug: "headphones" },
  { name: "Chargers", image: "/products/charger.png", slug: "charger" },
  { name: "Power Banks", image: "/products/powerbank.png", slug: "powerbank" },
  { name: "Keyboards", image: "/products/keyboard.png", slug: "keyboard" },
  { name: "Mouse", image: "/products/mouse.png", slug: "mouse" },
];

// ── Skeletons ──────────────────────────────────────────────────────────────────
function FlashDealSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="h-36 bg-slate-100" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-4 bg-slate-100 rounded w-1/3 mt-1" />
      </div>
    </div>
  );
}

function BundleSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex gap-4 animate-pulse"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      <div className="w-20 h-20 bg-slate-100 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-8 bg-slate-100 rounded-xl w-full mt-1" />
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DealsPage() {
  const [heroSeconds] = useState(2 * 86400 + 14 * 3600 + 32 * 60 + 18);

  const {
    data: deals = [],
    isLoading: dealsLoading,
    isError: dealsError,
    error: dealsErr,
    refetch: refetchDeals,
  } = useDealsProducts();

  const {
    data: bundles = [],
    isLoading: bundlesLoading,
    isError: bundlesError,
    error: bundlesErr,
    refetch: refetchBundles,
  } = useBundles();

  return (
    <div className="bg-slate-50 min-h-screen pb-16 relative">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-10 grid lg:grid-cols-3 gap-6">
        <DealHeroBlueBanner heroSeconds={heroSeconds} />
        <TopDealBanner />
      </section>

      <div className="relative z-10 pt-8">
        {/* ── Category icons ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                href={`/categories/${cat.slug}`}
                key={cat.name}
                className="bg-white flex flex-col items-center gap-3 cursor-pointer transition-all"
                style={{
                  borderRadius: "20px",
                  padding: "20px 16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(0,0,0,0.11)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.06)")
                }
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span
                  className="font-semibold"
                  style={{ color: "#334155", fontSize: "0.9rem" }}
                >
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <section
          className="max-w-7xl mx-auto px-4 mt-10 grid xl:grid-cols-3 gap-8"
          id="flash-deals"
        >
          {/* Flash Deals */}
          <div className="xl:col-span-2">
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "1.4rem", color: "#0f172a" }}
            >
              Limited Time Flash Deals
            </h2>

            {dealsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <FlashDealSkeleton key={i} />
                ))}
              </div>
            ) : dealsError ? (
              <QueryError error={dealsErr} onRetry={refetchDeals} />
            ) : deals.length === 0 ? (
              <p className="text-slate-400 text-sm py-6">
                No flash deals right now. Check back soon!
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deals.map((deal) => (
                  <FlashDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            )}
          </div>

          {/* Bundles */}
          <div>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "1.4rem", color: "#0f172a" }}
            >
              Bundle Savings
            </h2>

            {bundlesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BundleSkeleton key={i} />
                ))}
              </div>
            ) : bundlesError ? (
              <QueryError error={bundlesErr} onRetry={refetchBundles} />
            ) : bundles.length === 0 ? (
              <p className="text-slate-400 text-sm py-6">
                No bundles available right now.
              </p>
            ) : (
              <div className="space-y-4">
                {bundles.map((bundle) => (
                  <BundleCard key={bundle.id} bundle={bundle} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
