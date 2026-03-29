"use client";

import { useEffect, useState } from "react";

export default function PageLoader({ isLoading }) {
  const [visible, setVisible] = useState(isLoading);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Trigger fade-out then unmount
      setFading(true);
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    } else {
      setVisible(true);
      setFading(false);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated logo mark */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Orbit ring */}
        <span className="absolute w-20 h-20 rounded-full border-2 border-blue-100 animate-[spin_2.5s_linear_infinite]">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500" />
        </span>
        {/* Inner pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-blue-50 animate-[ping_1.8s_ease-in-out_infinite] opacity-60" />
        {/* Logo box */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-200 text-2xl select-none">
          📦
        </div>
      </div>

      {/* Brand name */}
      <p className="text-lg font-extrabold text-slate-900 tracking-tight mb-1">
        TechNest
      </p>

      {/* Progress bar */}
      <div className="w-40 h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes progress {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 70%;  margin-left: 15%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
