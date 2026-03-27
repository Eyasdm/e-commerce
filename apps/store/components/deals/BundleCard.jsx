"use client";

import { Stars } from "@/lib/utils";

export function BundleCard({ bundle }) {
  console.log(bundle.image);
  const imageUrl = `http://localhost:8000${bundle.image}`;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-md transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={imageUrl}
            alt={bundle.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 text-sm">
            {bundle.name}
          </h3>
          <p className="text-xs text-slate-500 truncate">
            {bundle.description}
          </p>
          <Stars rating={bundle.rating} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Save:{" "}
            <span className="font-bold text-green-600">
              ${bundle.savings.toFixed(2)}
            </span>
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-slate-900">
              ${bundle.bundlePrice.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${bundle.originalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
          Grab Bundle
        </button>
      </div>
    </div>
  );
}
