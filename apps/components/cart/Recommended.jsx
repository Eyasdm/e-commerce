"use client";
import ProductCard from "@/components/products/ProductCard";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";

export function Recommended() {
  const { data: products, isLoading, error } = useFeaturedProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
        ))}

      {error && <p>Failed to load products</p>}

      {products?.map((product, i) => (
        <ProductCard _id={product.id} key={product.id || i} {...product} />
      ))}
    </div>
  );
}
