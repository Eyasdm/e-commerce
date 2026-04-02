"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useProductsStore } from "@/store/useProductsStore";

import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import ActiveFilters from "@/components/products/ActiveFilters";
import SidebarFilters from "@/components/products/SidebarFilters";
import SortDropdown from "./SortDropdown";
import { PageError } from "@/components/ErrorStates";

export default function ProductsLayout({ category }) {
  const params = useSearchParams();

  const filters = useMemo(
    () => ({
      category: category?.toLowerCase(),
      keyword: params.get("q"),
      brand: params.get("brand"),
      rating: params.get("rating"),
      min: params.get("min"),
      max: params.get("max"),
      sort: params.get("sort"),
    }),
    [category, params],
  );

  const {
    products,
    fetchProducts,
    loadMore,
    hasMore,
    loading,
    initialLoading,
    error,
  } = useProductsStore();

  useEffect(() => {
    fetchProducts(1, filters);
  }, [filters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.documentElement.offsetHeight - 800;
      if (scrollPosition >= bottom && hasMore && !loading) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const searchQuery = params.get("q");
  const title = searchQuery
    ? `Search results for "${searchQuery}"`
    : category
      ? category.replace("-", " ")
      : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          Shop / {searchQuery ? "Search" : title}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-2 capitalize">
          {title}
        </h1>
      </div>

      {/* Active Filters */}
      <ActiveFilters />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Desktop sidebar only */}
        <div className="hidden lg:block lg:col-span-3">
          <SidebarFilters />
        </div>

        {/* Products */}
        <div className="col-span-1 lg:col-span-9">
          {/* Sort bar */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            <div className="flex items-center gap-2">
              {/* Mobile filter trigger */}
              <div className="lg:hidden">
                <SidebarFilters mobileOnly />
              </div>
              <SortDropdown />
            </div>
          </div>

          {/* Initial loading */}
          {initialLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            /* Error state */
            <PageError
              error={error}
              onRetry={() => fetchProducts(1, filters)}
            />
          ) : (
            <>
              {/* Empty state */}
              {products.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
                  <p className="text-4xl">🔍</p>
                  <p className="font-semibold text-slate-700">
                    No products found
                  </p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Try adjusting your filters or search term.
                  </p>
                </div>
              )}

              {/* Product grid */}
              {products.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product, i) => (
                    <ProductCard
                      key={product.id || i}
                      _id={product.id}
                      {...product}
                    />
                  ))}
                </div>
              )}

              {/* Load-more skeletons */}
              {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* End of results */}
              {!hasMore && !loading && products.length > 0 && (
                <p className="text-center text-muted-foreground py-10">
                  No more products
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
