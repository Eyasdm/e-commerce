import { Suspense } from "react";
import ProductsLayout from "@/components/products/ProductsLayout";

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsLayout category={params.category} />
    </Suspense>
  );
}
