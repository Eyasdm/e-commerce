import { Suspense } from "react";
import ProductsLayout from "@/components/products/ProductsLayout";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";

function CategoryFallback() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
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

// ← async page to await params
export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<CategoryFallback />}>
      <ProductsLayout category={slug} />
    </Suspense>
  );
}
