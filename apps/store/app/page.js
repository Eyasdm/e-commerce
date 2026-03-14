import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/getProducts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Headphones,
  Zap,
  Keyboard,
  Mouse,
  BatteryCharging,
  Truck,
  ShieldCheck,
  Headset,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <main className="bg-[#f5f7fb]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-20 pb-28">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-100 via-white to-blue-200" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
          {/* LEFT */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Premium Accessories
              <br />
              for Modern Devices
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              High-quality chargers, headphones, keyboards, and power banks to
              enhance your tech lifestyle.
            </p>

            <div className="mt-8 flex gap-4">
              <Button size="lg" className="rounded-xl px-8">
                <Link href="/shop">Shop Accessories</Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="rounded-xl px-8 bg-white"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-105">
            <Image
              src="/hero-bg.png"
              alt="Hero"
              fill
              priority
              className="object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FLOATING BAR ================= */}
      <section className="-mt-16 relative z-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap justify-between gap-4">
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
                className="flex items-center gap-2 px-6 py-3 min-w-40 bg-gray-50 rounded-xl hover:bg-blue-50 transition"
              >
                <item.icon size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEST SELLING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-14">
          Best Selling Accessories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              oldPrice={product.price + 30}
              rating={4}
              reviews={109}
              discount={15}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="text-blue-600 font-medium hover:underline"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ================= DEALS BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-400 text-white p-14 text-center shadow-xl">
          <h3 className="text-2xl font-semibold">
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

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex flex-wrap justify-center gap-16 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-blue-600" />
            Fast shipping
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-600" />
            Secure Payments
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center gap-2">
            <Headset size={20} className="text-blue-600" />
            24/7 Support
          </div>
        </div>
      </section>
    </main>
  );
}
