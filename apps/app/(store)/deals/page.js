"use client";

import { FlashDealCard } from "../../../components/deals/FlashDealCard";
import { BundleCard } from "../../../components/deals/BundleCard";
import { useBundles } from "@/hooks/useBundles";
import { useDealsProducts } from "@/hooks/useDealsProducts";
import { DealHeroBlueBanner } from "../../../components/deals/DealHeroBlueBanner";
import TopDealBanner from "@/components/deals/TopDealBanner";
import { QueryError } from "@/components/ErrorStates";
import { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Zap,
  BatteryCharging,
  Keyboard,
  Mouse,
} from "lucide-react";

const categories = [
  { name: "Headphones", icon: Headphones, slug: "headphones" },
  { name: "Chargers", icon: Zap, slug: "chargers" },
  { name: "Power Banks", icon: BatteryCharging, slug: "Powerbanks" },
  { name: "Keyboards", icon: Keyboard, slug: "keyboards" },
  { name: "Mouse", icon: Mouse, slug: "mouse" },
];

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
    <div className="bg-white rounded-2xl p-4 flex gap-4 animate-pulse shadow-sm">
      <div className="w-16 h-16 bg-slate-100 rounded-xl shrink-0" />
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
        <div className="h-8 bg-slate-100 rounded-xl w-full mt-1" />
      </div>
    </div>
  );
}

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
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2">
          <DealHeroBlueBanner heroSeconds={heroSeconds} />
        </div>
        <div className="lg:col-span-1">
          <TopDealBanner />
        </div>
      </section>

      {/* ── Category icons ── */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${cat.slug}`}
              className="bg-white flex flex-col items-center gap-2 p-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <cat.icon size={22} className="text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Main content ── */}
      <section
        className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 xl:grid-cols-3 gap-8"
        id="flash-deals"
      >
        {/* Flash Deals */}
        <div className="xl:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            ⚡ Limited Time Flash Deals
          </h2>

          {dealsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {deals.map((deal) => (
                <FlashDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>

        {/* Bundles */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            📦 Bundle Savings
          </h2>

          {bundlesLoading ? (
            <div className="space-y-3">
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
            <div className="space-y-3">
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
