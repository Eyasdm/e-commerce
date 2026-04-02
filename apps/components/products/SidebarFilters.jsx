"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProductsStore } from "@/store/useProductsStore";
import { SlidersHorizontal, X } from "lucide-react";

const brands = ["Anker", "Razer", "Ugreen", "Logitech"];

export default function SidebarFilters() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { setFilters, fetchProducts, reset } = useProductsStore();

  const buildFiltersFromParams = (searchParams) => {
    const filters = {};
    searchParams.forEach((value, key) => {
      if (value && value !== "undefined") filters[key] = value;
    });
    return filters;
  };

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(params.toString());
    if (!value) newParams.delete(key);
    else newParams.set(key, value);
    router.push(`?${newParams.toString()}`);
    const updatedFilters = buildFiltersFromParams(newParams);
    setFilters(updatedFilters);
    reset();
    fetchProducts(1, updatedFilters);
    setMobileOpen(false); // close drawer after selecting
  };

  const clearFilters = () => {
    router.push("?");
    setFilters({});
    reset();
    fetchProducts(1, {});
    setMobileOpen(false);
  };

  const FilterContent = () => (
    <div className="space-y-8">
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

      <button
        onClick={clearFilters}
        className="w-full border rounded-full py-2 text-sm hover:bg-gray-50"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm text-sm font-medium mb-4"
      >
        <SlidersHorizontal size={16} className="text-blue-600" />
        Filters
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-sm">
        <FilterContent />
      </div>
    </>
  );
}