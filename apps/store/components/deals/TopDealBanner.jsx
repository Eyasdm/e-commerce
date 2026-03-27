"use client";

import { useState, useEffect } from "react";
import { useSingleDeal } from "@/lib/hooks/useSingleDeal";
import Image from "next/image";

export default function TopDealBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: "02", m: "26", s: "21" });

  const { data: deal, isLoading } = useSingleDeal("69c6654eb84a3b29d541ecf8");

  const product = deal
    ? {
        name: deal.name,
        price: deal.price,
        oldPrice: deal.oldPrice,
        rating: deal.rating || 4.8,
        stock: deal.stock || 12,
        discount: deal.discount,
      }
    : null;

  useEffect(() => {
    let total = 2 * 3600 + 26 * 60 + 21;
    const timer = setInterval(() => {
      total -= 1;
      if (total < 0) {
        clearInterval(timer);
        return;
      }
      const h = String(Math.floor(total / 3600)).padStart(2, "0");
      const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
      const s = String(total % 60).padStart(2, "0");
      setTimeLeft({ h, m, s });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <p>Loading deal...</p>;

  if (!product) return <p>No deal found</p>;

  const stars = Math.floor(product.rating);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
      }}
    >
      {/* ── TOP: full-bleed image with overlaid badges + text ── */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #3b82f6 100%)",
          position: "relative",
          height: "260px",
          overflow: "hidden",
        }}
      >
        {/* Full-bleed product image */}
        <Image
          src="/products/headphone-sony.jpeg"
          alt={product.name}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={100}
          priority
        />

        {/* Gradient overlay so text stays readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,30,60,0.55) 0%, rgba(15,30,60,0.05) 45%, rgba(15,30,60,0.70) 100%)",
          }}
        />

        {/* Badge row — top */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              background: "#f97316",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "800",
              letterSpacing: "0.08em",
              padding: "4px 12px",
              borderRadius: "999px",
              textTransform: "uppercase",
            }}
          >
            Best Deal
          </span>

          <span
            style={{
              background: "rgba(255,255,255,0.18)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "700",
              padding: "3px 10px",
              borderRadius: "999px",
              backdropFilter: "blur(6px)",
            }}
          >
            -{product.discount}% OFF
          </span>
        </div>

        {/* Product name + stars — bottom of image */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
          }}
        >
          <h3
            style={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "1rem",
              lineHeight: 1.3,
              marginBottom: "4px",
            }}
          >
            {product.name}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "#fbbf24", fontSize: "13px" }}>
              {"★".repeat(stars)}
              {"☆".repeat(5 - stars)}
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px" }}>
              ({product.rating})
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: white content — unchanged ── */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
        }}
      >
        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}
          >
            ${product.price}
          </span>
          {product.oldPrice && (
            <span
              style={{
                fontSize: "0.85rem",
                color: "#94a3b8",
                textDecoration: "line-through",
              }}
            >
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Countdown */}
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}
          >
            ⏱ Ends in
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "auto",
            }}
          >
            {[timeLeft.h, timeLeft.m, timeLeft.s].map((unit, i) => (
              <span
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{
                    background: "#1e3a5f",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontVariantNumeric: "tabular-nums",
                    minWidth: "30px",
                    textAlign: "center",
                  }}
                >
                  {unit}
                </span>
                {i < 2 && (
                  <span
                    style={{
                      color: "#64748b",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    :
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Stock indicator */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span
              style={{ fontSize: "11px", color: "#ef4444", fontWeight: "600" }}
            >
              🔥 Only {product.stock} left
            </span>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              {Math.round((product.stock / 50) * 100)}% sold
            </span>
          </div>
          <div
            style={{
              background: "#f1f5f9",
              borderRadius: "999px",
              height: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${100 - Math.round((product.stock / 50) * 100)}%`,
                height: "100%",
                background: "linear-gradient(90deg, #f97316, #ef4444)",
                borderRadius: "999px",
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "0.9rem",
            padding: "13px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
            transition: "opacity 0.2s, transform 0.1s",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Buy Now — ${product.price}
        </button>
      </div>
    </div>
  );
}
