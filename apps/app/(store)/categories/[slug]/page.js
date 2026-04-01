"use client";

import { useParams } from "next/navigation";
import ProductsLayout from "@/components/products/ProductsLayout";

export default function CategoryPage() {
  const { slug } = useParams();

  return <ProductsLayout category={slug} />;
}
