"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProductsStore } from "@/lib/useProductsStore";

import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import ActiveFilters from "@/components/products/ActiveFilters";
import SidebarFilters from "@/components/products/SidebarFilters";
import SortDropdown from "./SortDropdown";

export default function ProductsLayout({ category }) {
  const params = useSearchParams();

  const brand = params.get("brand");
  const rating = params.get("rating");
  const min = params.get("min");
  const max = params.get("max");
  const sort = params.get("sort");

  const {
    products,
    fetchProducts,
    loadMore,
    hasMore,
    loading,
    initialLoading,
  } = useProductsStore();

  // 🚀 Fetch when filters change
  useEffect(() => {
    const filters = {
      category,
      brand,
      rating,
      min,
      max,
      sort,
    };

    fetchProducts(1, filters);
  }, [category, brand, rating, min, max, sort]);

  // ♾️ Infinite Scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.innerHeight + window.scrollY;
          const bottom = document.documentElement.offsetHeight - 800;

          if (scrollPosition >= bottom && hasMore && !loading) {
            loadMore();
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const title = category ? category.replace("-", " ") : "All Products";
  console.log(products);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">Shop / {title}</p>
        <h1 className="text-3xl font-bold mt-2 capitalize">{title}</h1>
      </div>

      {/* Filters */}
      <ActiveFilters />

      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <SidebarFilters />
        </div>

        {/* Products */}
        <div className="col-span-9">
          {/* Sort */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>

            <SortDropdown />
          </div>

          {/* Initial Loading */}
          {initialLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Products */}
          {!initialLoading && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>

              {/* Load more skeleton */}
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* End */}
              {!hasMore && !loading && (
                <p className="text-center text-muted-foreground py-10">
                  No more products to load
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
