"use client";

import Logo from "@/components/Logo";
import { Github } from "lucide-react";
import Link from "next/link";
import PaymentMethods from "./PaymentMethods";
import Linkedin from "./Linkedin";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400  border-t border-slate-800">
      {/* Top CTA */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Get 10% Off Your First Order
          </h3>
          <p className="text-slate-400 mb-6">
            Subscribe to stay updated with the latest tech accessories.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
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
              <Github size={18} className="hover:text-white cursor-pointer" />
            </a>
            <Linkedin />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories/headphones" className="hover:text-white">
                Headphones
              </Link>
            </li>
            <li>
              <Link href="/categories/chargers" className="hover:text-white">
                Chargers
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-white">
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
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
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

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TechNest. Built for portfolio showcase.
      </div>
    </footer>
  );
}
