"use client";

import { Recommended } from "@/components/cart/Recommended";
import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import {
  BatteryCharging,
  Headphones,
  Headset,
  Keyboard,
  Mouse,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#f5f7fb]">
      <HeroSlider />

      {/* ── CATEGORY BAR ── */}
      <section className="mt-10 sm:mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            {/* Scrollable row on mobile, wrap on desktop */}
            <div className="flex overflow-x-auto gap-3 sm:flex-wrap sm:justify-between pb-1 sm:pb-0 scrollbar-hide">
              {[
                { icon: Headphones, label: "Headphones", slug: "headphones" },
                { icon: Zap, label: "Chargers", slug: "chargers" },
                { icon: Keyboard, label: "Keyboards", slug: "keyboards" },
                { icon: Mouse, label: "Mouse", slug: "mouse" },
                {
                  icon: BatteryCharging,
                  label: "Power Banks",
                  slug: "Powerbanks",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={`/categories/${item.slug}`}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition shrink-0 sm:shrink sm:min-w-0"
                >
                  <item.icon size={18} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLING ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14">
          Best Selling Accessories
        </h2>
        <Recommended />
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="text-blue-600 font-medium hover:underline"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── DEALS BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-400 text-white p-8 sm:p-14 text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Up to 30% Off Selected Accessories
          </h3>
          <Button
            variant="secondary"
            size="lg"
            className="mt-6 bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8"
          >
            <Link href="/deals">Shop Deals</Link>
          </Button>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 text-gray-600 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Truck size={20} className="text-blue-600 shrink-0" />
            <span>Fast shipping</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:border-x sm:border-border">
            <ShieldCheck size={20} className="text-blue-600 shrink-0" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Headset size={20} className="text-blue-600 shrink-0" />
            <span>24/7 Support</span>
          </div>
        </div>
      </section>
    </main>
  );
}
