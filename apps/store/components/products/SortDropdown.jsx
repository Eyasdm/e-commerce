"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const sort = params.get("sort") || "best";

  const updateSort = (value) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === "best") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", value);
    }

    const query = newParams.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium shadow-sm focus:outline-none hover:bg-gray-50 transition">
        Sort <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-2 rounded-xl border border-gray-200 shadow-xl backdrop-blur bg-white/95"
      >
        <div className="grid gap-1">
          <DropdownMenuItem
            onClick={() => updateSort("best")}
            className="px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Best Selling
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => updateSort("priceLow")}
            className="px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Price: Low to High
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => updateSort("priceHigh")}
            className="px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Price: High to Low
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => updateSort("rating")}
            className="px-2 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            Top Rated
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
