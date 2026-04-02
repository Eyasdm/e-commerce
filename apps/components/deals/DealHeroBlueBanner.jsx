"use client";

import { CountdownTimer } from "@/components/deals/CountdownTimer";

export function DealHeroBlueBanner({ heroSeconds }) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        borderRadius: "24px",
        minHeight: "280px",
        padding: "clamp(28px, 5vw, 52px) clamp(24px, 5vw, 48px)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        backgroundImage: "url('/products/blue-banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.30)" }}
      />

      <div className="relative z-10 max-w-md">
        <p
          className="uppercase tracking-widest text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Limited Time
        </p>

        <h1
          className="font-extrabold leading-tight mb-3 sm:mb-4 text-white"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", lineHeight: 1.1 }}
        >
          Up to 30% Off <br /> Tech Accessories
        </h1>

        <p
          className="mb-5 sm:mb-8 text-sm sm:text-base"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Limited time deals on our best-selling gear
        </p>

        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
          <span
            className="uppercase tracking-wider text-[10px] sm:text-xs"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Ends In
          </span>
          <CountdownTimer initialSeconds={heroSeconds} />
        </div>

        <button
          className="font-semibold transition text-sm sm:text-base"
          style={{
            background: "#ffffff",
            color: "#1d4ed8",
            padding: "10px 24px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() =>
            document
              .getElementById("flash-deals")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop Deals
        </button>
      </div>
    </div>
  );
}
