"use client";

import { CountdownTimer } from "@/components/deals/CountdownTimer";

export function DealHeroBlueBanner({ heroSeconds }) {
  return (
    <div
      className="relative col-span-2 overflow-hidden"
      style={{
        borderRadius: "28px",
        minHeight: "340px",
        padding: "52px 48px 64px 48px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",

        backgroundImage: "url('/products/blue-banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.25)",
        }}
      />

      <div className="relative z-10 max-w-md">
        <p
          className="uppercase tracking-widest text-sm font-semibold mb-3"
          style={{
            color: "rgba(255,255,255,0.8)",
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
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "1rem",
          }}
        >
          Limited time deals on our best-selling gear
        </p>

        <div className="flex items-center gap-4 mb-8">
          <span
            className="uppercase tracking-wider"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.7rem",
            }}
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
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            document
              .getElementById("flash-deals")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Shop Deals
        </button>
      </div>
    </div>
  );
}
