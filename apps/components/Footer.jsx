"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { Github, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import PaymentMethods from "./PaymentMethods";
import Linkedin from "./ui/Linkedin";
import api from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");

    try {
      const { data } = await api.post("/newsletter/subscribe", { email });
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message || "Something went wrong. Try again.",
      );
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* ── Newsletter banner ────────────────────────────────────────────── */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Get 10% Off Your First Order
          </h3>
          <p className="text-slate-400 mb-6">
            Subscribe to stay updated with the latest tech accessories.
          </p>

          {status === "success" ? (
            /* Success state */
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium">
              <CheckCircle2 size={18} />
              <span>{message}</span>
            </div>
          ) : (
            /* Input row */
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                  setMessage("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                disabled={status === "loading"}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
              />
              <button
                onClick={handleSubscribe}
                disabled={status === "loading" || !email.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Sending…
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          )}

          {/* Error message */}
          {status === "error" && (
            <p className="mt-3 text-red-400 text-sm">{message}</p>
          )}
        </div>
      </div>

      {/* ── Main footer ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
            TechNest is a modern e-commerce platform showcasing premium tech
            accessories with a clean and scalable architecture.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/Eyasdm">
              <Github
                size={18}
                className="hover:text-white cursor-pointer transition"
              />
            </a>
            <Linkedin />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories/headphones"
                className="hover:text-white transition"
              >
                Headphones
              </Link>
            </li>
            <li>
              <Link
                href="/categories/chargers"
                className="hover:text-white transition"
              >
                Chargers
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-white transition">
                Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h4 className="text-white font-semibold mb-4">Secure Payments</h4>
          <p className="text-sm text-slate-500 mb-4">
            Powered by Stripe with industry-leading security.
          </p>
          <PaymentMethods />
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TechNest. Built for portfolio showcase.
      </div>
    </footer>
  );
}
