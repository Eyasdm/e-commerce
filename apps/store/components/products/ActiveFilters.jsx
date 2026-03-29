"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useProductsStore } from "@/store/useProductsStore";

export default function ActiveFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const { setFilters, clearFilters } = useProductsStore();

  const brand = params.get("brand");
  const rating = params.get("rating");
  const min = params.get("min");
  const max = params.get("max");

  const updateUrl = (newParams) => {
    const query = newParams.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const removeFilter = (key) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete(key);

    const currentFilters = useProductsStore.getState().filters;
    const updatedFilters = { ...currentFilters };

    delete updatedFilters[key];

    setFilters(updatedFilters);

    updateUrl(newParams);
  };

  const removePrice = () => {
    const newParams = new URLSearchParams(params.toString());

    newParams.delete("min");
    newParams.delete("max");

    const currentFilters = useProductsStore.getState().filters;

    const updatedFilters = { ...currentFilters };

    delete updatedFilters.min;
    delete updatedFilters.max;

    setFilters(updatedFilters);

    updateUrl(newParams);
  };

  const clearAll = () => {
    clearFilters();
    router.replace(pathname, { scroll: false });
  };

  if (!brand && !rating && !min && !max) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {brand && (
        <Badge
          label={`Brand: ${brand}`}
          onRemove={() => removeFilter("brand")}
        />
      )}

      {rating && (
        <Badge
          label={`${rating}★ & up`}
          onRemove={() => removeFilter("rating")}
        />
      )}

      {(min || max) && (
        <Badge label={`$${min || 0} - $${max || "∞"}`} onRemove={removePrice} />
      )}

      <button
        onClick={clearAll}
        className="text-sm text-blue-600 hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}

function Badge({ label, onRemove }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
      {label}

      <button onClick={onRemove} className="text-gray-500 hover:text-black">
        ✕
      </button>
    </div>
  );
}
