"use client";

import { FlashDealCard } from "../../components/deals/FlashDealCard";
import { BundleCard } from "../../components/deals/BundleCard";
import { useBundles } from "@/lib/hooks/useBundles";

import { useDealsProducts } from "@/lib/hooks/useDealsProducts";
import { DealHeroBlueBanner } from "../../components/deals/DealHeroBlueBanner";
import TopDealBanner from "@/components/deals/TopDealBanner";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Headphones", image: "/products/headphone.png", slug: "headphones" },
  { name: "Chargers", image: "/products/charger.png", slug: "charger" },
  { name: "Power Banks", image: "/products/powerbank.png", slug: "powerbank" },
  { name: "Keyboards", image: "/products/keyboard.png", slug: "keyboard" },
  { name: "Mouse", image: "/products/mouse.png", slug: "mouse" },
];

export default function DealsPage() {
  const [heroSeconds] = useState(2 * 86400 + 14 * 3600 + 32 * 60 + 18);
  const { data: deals = [], isLoading } = useDealsProducts();
  const { data: bundles = [], isLoading: bundlesLoading } = useBundles();

  return (
    <div className="bg-slate-50 min-h-screen pb-16 relative">
      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-10 grid lg:grid-cols-3 gap-6">
        {/* Blue Hero Banner */}
        <DealHeroBlueBanner heroSeconds={heroSeconds} />

        {/* ---- Featured Deal Card ---- */}
        <TopDealBanner />
      </section>

      {/* ================= WHITE CONTENT AREA (rectangular, no clip) ================= */}
      <div className="relative z-10 pt-8">
        {/* ================= CATEGORY ICONS ================= */}
        <section className="max-w-7xl mx-auto px-4 mt-4  ">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
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

        {/* ================= MAIN GRID ================= */}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isLoading ? (
                <p className="text-gray-400">Loading deals...</p>
              ) : (
                deals.map((deal) => <FlashDealCard key={deal.id} deal={deal} />)
              )}
            </div>
          </div>

          {/* Bundles Sidebar */}
          <div>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "1.4rem", color: "#0f172a" }}
            >
              Bundle Savings
            </h2>
            <div className="space-y-4">
              {bundlesLoading ? (
                <p className="text-gray-400">Loading bundles...</p>
              ) : (
                bundles.map((bundle) => (
                  <BundleCard key={bundle.id} bundle={bundle} />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
