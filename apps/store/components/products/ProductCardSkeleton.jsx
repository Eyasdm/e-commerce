"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col h-full">
      {/* Image */}
      <Skeleton className="h-44 w-full rounded-xl mb-4" />

      {/* Title */}
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />

      {/* Rating */}
      <Skeleton className="h-4 w-1/3 mb-4" />

      {/* Price */}
      <Skeleton className="h-6 w-1/4 mb-4" />

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-full mt-auto" />
    </div>
  );
}
