"use client";

import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useProductsStore } from "@/lib/useProductsStore";

const SORT_OPTIONS = [
  { label: "Best Selling", value: "best" },
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Top Rated", value: "rating" },
];

export default function SortDropdown() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const { setFilters, fetchProducts, reset } = useProductsStore();

  const sort = params.get("sort") || "best";

  const updateSort = (value) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === "best") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", value);
    }

    const query = newParams.toString();

    // update URL
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });

    // update store filters
    const currentFilters = useProductsStore.getState().filters;

    setFilters({
      ...currentFilters,
      sort: value,
    });

    // reset + fetch new sorted products
    reset();
    fetchProducts(1);
  };

  const activeLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Best Selling";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 transition">
        {activeLabel}
        <ChevronDown size={16} className="text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-xl border border-gray-200 shadow-xl backdrop-blur bg-white/95"
      >
        <div className="grid gap-1">
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => updateSort(option.value)}
              className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              {option.label}

              {sort === option.value && (
                <Check size={16} className="text-blue-600" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
