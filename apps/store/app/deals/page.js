"use client";

import { useState } from "react";
import { FlashDealCard } from "../../components/deals/FlashDealCard";
import { CountdownTimer } from "../../components/deals/CountdownTimer";
import { BundleCard } from "../../components/deals/BundleCard";
import { flashDeals, bundles, categories } from "../../lib/mockData";

export default function DealsPage() {
  const [heroSeconds] = useState(2 * 86400 + 14 * 3600 + 32 * 60 + 18);

  return (
    <div className="bg-slate-50 min-h-screen pb-16 relative">
      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-10 grid lg:grid-cols-3 gap-6">
        {/* Blue Hero Banner */}
        <div
          className="relative col-span-2 overflow-hidden"
          style={{
            borderRadius: "28px",
            background:
              "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
            padding: "52px 48px 64px 48px",
            boxShadow:
              "0 24px 60px rgba(37,99,235,0.35), 0 8px 24px rgba(0,0,0,0.12)",
            minHeight: "340px",
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              filter: "blur(48px)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 max-w-md">
            <p
              className="uppercase tracking-widest text-sm font-semibold mb-3"
              style={{
                color: "rgba(191,219,254,0.9)",
                letterSpacing: "0.15em",
              }}
            >
              Limited Time
            </p>

            <h1
              className="font-extrabold leading-tight mb-4"
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            >
              Up to 30% Off <br /> Tech Accessories
            </h1>

            <p
              className="mb-8"
              style={{ color: "rgba(219,234,254,0.85)", fontSize: "1rem" }}
            >
              Limited time deals on our best-selling gear
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span
                className="uppercase tracking-wider"
                style={{ color: "rgba(191,219,254,0.8)", fontSize: "0.7rem" }}
              >
                Ends In
              </span>
              <CountdownTimer initialSeconds={heroSeconds} />
            </div>

            <button
              className="font-semibold transition"
              style={{
                background: "#ffffff",
                color: "#1d4ed8",
                padding: "12px 32px",
                borderRadius: "14px",
                fontSize: "0.95rem",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#eff6ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#ffffff")
              }
            >
              Shop Deals
            </button>
          </div>

          {/* Floating product image */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
            style={{ width: "280px" }}
          >
            {/* Glow behind product */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(147,197,253,0.25)",
                filter: "blur(40px)",
                transform: "scale(1.3)",
              }}
            />
            <img
              src="/products/headphones.png"
              alt="Headphones"
              className="relative w-full"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.4))" }}
            />
          </div>
        </div>

        {/* ---- Featured Deal Card ---- */}
        <div
          className="bg-white flex flex-col justify-between"
          style={{
            borderRadius: "28px",
            padding: "28px 24px",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <span
              className="inline-block text-white text-xs font-bold"
              style={{
                background: "#f97316",
                padding: "5px 14px",
                borderRadius: "999px",
                letterSpacing: "0.05em",
              }}
            >
              LIMITED TIME OFFER
            </span>

            <p
              className="line-through mt-5 mb-0"
              style={{ color: "#94a3b8", fontSize: "0.9rem" }}
            >
              $99.99
            </p>

            <p
              className="font-black"
              style={{ color: "#0f172a", fontSize: "2rem", lineHeight: 1.1 }}
            >
              $139.99
            </p>

            <p
              className="mt-2 mb-6"
              style={{ color: "#94a3b8", fontSize: "0.72rem" }}
            >
              COUNTDOWN: 02d 14h 32m 18s
            </p>
          </div>

          <div className="flex justify-center my-2">
            <img
              src="/products/headphones.png"
              alt="Headphones"
              className="w-32"
              style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))" }}
            />
          </div>

          <button
            className="w-full font-semibold transition mt-4"
            style={{
              background: "#f97316",
              color: "#ffffff",
              padding: "13px 0",
              borderRadius: "14px",
              fontSize: "0.95rem",
              boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#ea6c0a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f97316")}
          >
            Shop Deals
          </button>
        </div>
      </section>

      {/* ================= WHITE CONTENT AREA (rectangular, no clip) ================= */}
      <div className="relative z-10">
        {/* ================= CATEGORY ICONS ================= */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
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
                    background: "#f1f5f9",
                    borderRadius: "14px",
                  }}
                >
                  <img src={cat.image} className="w-10" alt={cat.name} />
                </div>
                <span
                  className="font-semibold"
                  style={{ color: "#334155", fontSize: "0.9rem" }}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <section className="max-w-7xl mx-auto px-4 mt-10 grid xl:grid-cols-3 gap-8">
          {/* Flash Deals */}
          <div className="xl:col-span-2">
            <h2
              className="font-bold mb-6"
              style={{ fontSize: "1.4rem", color: "#0f172a" }}
            >
              Limited Time Flash Deals
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {flashDeals.map((deal) => (
                <FlashDealCard key={deal.id} deal={deal} />
              ))}
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
              {bundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
