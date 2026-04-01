"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Package,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Keyboard,
  Mouse,
  BatteryCharging,
} from "lucide-react";

// ── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "accessories",
    badge: "New Arrivals 2026",
    headline: ["Premium Accessories", "for Modern Devices"],
    sub: "High-quality chargers, headphones, keyboards, and power banks to elevate your tech lifestyle.",
    cta: { label: "Shop Accessories", href: "/shop" },
    ctaSecondary: { label: "Browse Categories", href: "/categories" },
    image: "/hero-bg.png",
    accent: "#2563eb",
    bg: "from-[#dbeafe] via-[#f0f6ff] to-[#e0eaff]",
    badgeBg: "bg-blue-100 text-blue-700",
  },
  {
    id: "deals",
    badge: "Limited Time",
    headline: ["Up to 30% Off", "Selected Accessories"],
    sub: "Flash deals on top-rated headphones, keyboards, and power banks. Ends soon — don't miss out.",
    cta: { label: "Shop Deals Now", href: "/deals" },
    ctaSecondary: { label: "See All Offers", href: "/deals#flash-deals" },
    image: "/hero-deals.png",
    accent: "#dc2626",
    bg: "from-[#fff1f2] via-[#fff7f7] to-[#fce7f3]",
    badgeBg: "bg-red-100 text-red-600",
  },
  {
    id: "bundle",
    badge: "Best Value Bundle",
    headline: ["Work From Home", "Ultimate Bundle"],
    sub: "Mechanical keyboard, wireless mouse, and noise-cancelling headphones — everything you need in one box.",
    cta: { label: "Get the Bundle", href: "/deals#bundles" },
    ctaSecondary: { label: "Learn More", href: "/deals" },
    image: "/hero-bundle.png",
    accent: "#059669",
    bg: "from-[#d1fae5] via-[#f0fdf9] to-[#e0f2fe]",
    badgeBg: "bg-emerald-100 text-emerald-700",
  },
];

const CATEGORIES = [
  { icon: Headphones, label: "Headphones", slug: "headphones" },
  { icon: Zap, label: "Chargers", slug: "chargers" },
  { icon: Keyboard, label: "Keyboards", slug: "keyboards" },
  { icon: Mouse, label: "Mouse", slug: "mouse" },
  { icon: BatteryCharging, label: "Power Banks", slug: "powerbanks" },
];

function SlideDot({ active, accent, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-2 rounded-full transition-all duration-500 focus:outline-none"
      style={{
        width: active ? "2rem" : "0.5rem",
        background: active ? accent : "#cbd5e1",
      }}
    />
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");

  const goTo = useCallback(
    (index, dir = "right") => {
      if (animating || index === current) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 420);
    },
    [animating, current],
  );

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length, "right"),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length, "left"),
    [current, goTo],
  );

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <>
      {/* ═══════════════════ HERO ════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "560px" }}
      >
        {/* Animated bg */}
        <div
          className={`absolute inset-0 -z-10 bg-linear-to-br transition-all duration-700 ${slide.bg}`}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute right-0 top-0 w-[55%] h-full -z-10 transition-colors duration-700"
          style={{
            background: `radial-gradient(ellipse at 70% 40%, ${slide.accent}18 0%, transparent 65%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-10">
          {/* LEFT — text */}
          <div
            key={`text-${current}`}
            className={`transition-all duration-500 ${
              animating
                ? direction === "right"
                  ? "-translate-x-6 opacity-0"
                  : "translate-x-6 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-5 ${slide.badgeBg}`}
            >
              {slide.id === "deals" && <Zap size={11} />}
              {slide.id === "bundle" && <Package size={11} />}
              {slide.badge}
            </span>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] text-slate-900 tracking-tight mb-5">
              {slide.headline[0]}
              <br />
              <span style={{ color: slide.accent }}>{slide.headline[1]}</span>
            </h1>

            <p className="text-base text-slate-500 leading-relaxed max-w-md mb-8">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: slide.accent,
                  boxShadow: `0 8px 24px ${slide.accent}40`,
                }}
              >
                {slide.cta.label} <ArrowRight size={15} />
              </Link>
              <Link
                href={slide.ctaSecondary.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm font-bold shadow-sm hover:border-slate-300 transition-all active:scale-95"
              >
                {slide.ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* RIGHT — image with subtle radius */}
          <div
            key={`img-${current}`}
            className={`relative h-95 md:h-110 transition-all duration-500 ${
              animating
                ? direction === "right"
                  ? "translate-x-8 opacity-0"
                  : "-translate-x-8 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {/* rounded wrapper — radius-2xl = 16px, subtle not aggressive */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.headline.join(" ")}
                fill
                priority={current === 0}
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Prev / dots / next */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition shadow-sm"
          >
            <ChevronLeft size={15} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <SlideDot
                key={s.id}
                active={i === current}
                accent={slide.accent}
                onClick={() => goTo(i, i > current ? "right" : "left")}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition shadow-sm"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute top-6 right-8 text-xs font-bold text-slate-400 tabular-nums">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-slate-200/60">
          <div
            key={current}
            className="h-full rounded-full"
            style={{
              background: slide.accent,
              animation: "progressBar 6s linear forwards",
            }}
          />
        </div>
      </section>

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes shinePulse {
          0% {
            opacity: 0.3;
            transform: scaleX(0.5);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
          100% {
            opacity: 0.3;
            transform: scaleX(0.5);
          }
        }
      `}</style>
    </>
  );
}
