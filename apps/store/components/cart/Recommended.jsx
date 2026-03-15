"use client";
import ProductCard from "@/components/products/ProductCard";

export function Recommended() {
  return (
    <div className="mt-16">
      <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          image="/products/earbuds.png"
          name="Wireless Earbuds"
          price={59}
          oldPrice={99}
          rating={4}
          reviews={120}
          discount={15}
        />

        <ProductCard
          image="/products/powerbank.png"
          name="Compact Power Bank"
          price={109}
          rating={5}
          reviews={90}
        />

        <ProductCard
          image="/products/charger.png"
          name="Fast Charging Wall Charger"
          price={49}
          oldPrice={59}
          rating={4}
          reviews={78}
          discount={15}
        />

        <ProductCard
          image="/products/cable.png"
          name="Braided USB-C Cable"
          price={15}
          oldPrice={19}
          rating={4}
          reviews={60}
          discount={20}
        />
      </div>
    </div>
  );
}
