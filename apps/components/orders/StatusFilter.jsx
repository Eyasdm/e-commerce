"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StatusFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-4 py-2 border rounded-lg text-sm">
        Filter by status
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 p-2 space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked />
          All
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Pending
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Shipped
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Delivered
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Cancelled
        </label>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
