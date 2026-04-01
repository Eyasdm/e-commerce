// app/(store)/search/page.jsx
import { Suspense } from "react";
import SearchResults from "./SearchResults";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

function SearchFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-2" />
        <div className="h-8 w-64 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-3">
          <div className="h-96 bg-muted rounded animate-pulse" />
        </div>
        <div className="col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
