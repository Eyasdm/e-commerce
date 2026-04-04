"use client";

import { useState, useEffect } from "react";
import { useSingleDeal } from "@/hooks/useSingleDeal";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks/cart/useCart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Loader2, Check } from "lucide-react";
import toast from "react-hot-toast";

const DEAL_ID = "69c80fa794e5f2a81e4dde9e";

export default function TopDealBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: "02", m: "26", s: "21" });
  const { data: deal, isLoading } = useSingleDeal(DEAL_ID);
  const { isAuthenticated } = useAuth();
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: cart = [] } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const productId = deal?.id || deal?._id;
  const alreadyInCart = cart.some((item) => item.productId === productId);

  useEffect(() => {
    let total = 2 * 3600 + 26 * 60 + 21;
    const timer = setInterval(() => {
      total -= 1;
      if (total < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        h: String(Math.floor(total / 3600)).padStart(2, "0"),
        m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
        s: String(total % 60).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      router.push("/auth");
      return;
    }
    if (alreadyInCart) {
      router.push("/cart");
      return;
    }
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        },
      },
    );
  };

  const renderButton = () => {
    if (alreadyInCart)
      return (
        <>
          <Check size={16} /> Go to Cart
        </>
      );
    if (isPending)
      return (
        <>
          <Loader2 size={16} className="animate-spin" /> Adding...
        </>
      );
    if (added)
      return (
        <>
          <Check size={16} /> Added!
        </>
      );
    return (
      <>
        <ShoppingCart size={16} /> Add to Cart
      </>
    );
  };

  if (isLoading)
    return <div className="h-full bg-gray-100 animate-pulse rounded-2xl" />;
  if (!deal) return null;

  const stars = Math.floor(deal.rating || 4.8);

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
      {/* ✅ Clickable image area */}
      <Link href={`/shop/${productId}`}>
        <div
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #2563eb 60%, #3b82f6 100%)",
            position: "relative",
            height: "260px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <Image
            src="/products/headphone-sony.jpeg"
            alt={deal.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(15,30,60,0.55) 0%, rgba(15,30,60,0.05) 45%, rgba(15,30,60,0.70) 100%)",
            }}
          />

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
              -{deal.discount}% OFF
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
            }}
          >
            {/* ✅ Clickable name */}
            <h3
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "1rem",
                lineHeight: 1.3,
                marginBottom: "4px",
              }}
            >
              {deal.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ color: "#fbbf24", fontSize: "13px" }}>
                {"★".repeat(stars)}
                {"☆".repeat(5 - stars)}
              </span>
              <span
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px" }}
              >
                ({deal.rating})
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom content */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}
          >
            ${deal.price}
          </span>
          {deal.oldPrice && (
            <span
              style={{
                fontSize: "0.85rem",
                color: "#94a3b8",
                textDecoration: "line-through",
              }}
            >
              ${deal.oldPrice}
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

        {/* Stock */}
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
              🔥 Only {deal.stock} left
            </span>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              {Math.round((deal.stock / 50) * 100)}% sold
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
                width: `${100 - Math.round((deal.stock / 50) * 100)}%`,
                height: "100%",
                background: "linear-gradient(90deg, #f97316, #ef4444)",
                borderRadius: "999px",
              }}
            />
          </div>
        </div>

        {/* ✅ Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isPending}
          style={{
            width: "100%",
            background:
              alreadyInCart || added
                ? "linear-gradient(135deg, #16a34a 0%, #15803d 100%)"
                : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "0.9rem",
            padding: "13px",
            borderRadius: "12px",
            border: "none",
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "opacity 0.2s, transform 0.1s",
          }}
        >
          {renderButton()}
        </button>
      </div>
    </div>
  );
}
