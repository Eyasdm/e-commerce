"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useProductsStore } from "@/store/useProductsStore";

const brands = ["Anker", "Razer", "Ugreen", "Logitech"];

export default function SidebarFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const { setFilters, fetchProducts, reset } = useProductsStore();

  // 🔹 helper to build clean filters object
  const buildFiltersFromParams = (searchParams) => {
    const filters = {};

    searchParams.forEach((value, key) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "undefined"
      ) {
        filters[key] = value;
      }
    });

    return filters;
  };

  // 🔹 update param
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(params.toString());

    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    const queryString = newParams.toString();

    // 1. update URL
    router.push(`?${queryString}`);

    // 2. build clean filters
    const updatedFilters = buildFiltersFromParams(newParams);

    // 3. update store + refetch
    setFilters(updatedFilters);
    reset();
    fetchProducts(1, updatedFilters);
  };

  // 🔹 clear all filters
  const clearFilters = () => {
    router.push("?");

    setFilters({});
    reset();
    fetchProducts(1, {});
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-8">
      {/* Brand */}
      <div>
        <h3 className="font-semibold mb-3">By Brand</h3>

        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="brand"
                checked={params.get("brand") === brand}
                onChange={() => updateParam("brand", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">By Rating</h3>

        <div className="space-y-2 text-sm">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                checked={params.get("rating") === String(r)}
                onChange={() => updateParam("rating", r)}
              />
              {r} Stars & Up
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-3">By Price</h3>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={params.get("min") || ""}
            onChange={(e) => updateParam("min", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Max"
            value={params.get("max") || ""}
            onChange={(e) => updateParam("max", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="w-full border rounded-full py-2 text-sm hover:bg-gray-50"
      >
        Clear Filters
      </button>
    </div>
  );
}
