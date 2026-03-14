"use client";

import { useRouter, useSearchParams } from "next/navigation";

const brands = ["Anker", "Razer", "Ugreen", "Logitech", "Aukey"];

export default function SidebarFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(params.toString());

    if (!value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`?${newParams.toString()}`);
  };

  const clearFilters = () => {
    router.push("?");
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
            defaultValue={params.get("min") || ""}
            onBlur={(e) => updateParam("min", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Max"
            defaultValue={params.get("max") || ""}
            onBlur={(e) => updateParam("max", e.target.value)}
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
}
