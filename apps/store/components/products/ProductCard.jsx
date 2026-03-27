"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ProductCard({
  image,
  name,
  price,
  oldPrice,
  rating = 4,
  reviews = 109,
  discount,
}) {
  const imageUrl = `http://localhost:8000${image}`;

  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {" "}
      {/* Discount Badge */}
      {Number(discount) > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          {discount}% OFF
        </div>
      )}
      {/* Product Image */}
      <div className="relative w-full h-64">
        <Image src={imageUrl} fill className="object-cover" alt="product" />
      </div>
      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 min-h-10">
        {name}
      </h3>
      {/* Rating */}
      <div className="flex items-center gap-1 mt-2 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "#facc15" : "none"}
            stroke="#facc15"
          />
        ))}
        <span className="text-xs text-gray-500 ml-2">${reviews}</span>
      </div>
      {/* Prices */}
      <div className="mt-3 flex items-center gap-2">
        {oldPrice && (
          <span className="text-sm text-gray-400 line-through">
            ${oldPrice}
          </span>
        )}

        <span className="text-lg font-bold text-gray-900">${price}</span>
      </div>
      {/* Button */}
      <Button className="mt-auto w-full rounded-full">Add to Cart</Button>{" "}
    </div>
  );
}
