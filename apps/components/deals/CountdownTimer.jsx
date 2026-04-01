"use client";
import { formatTime } from "@/lib/utils";
import { useState, useEffect } from "react";

// ─── CountdownTimer ───────────────────────────────────────────────────────────

export function CountdownTimer({ initialSeconds, small = false }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { h, m, s } = formatTime(seconds);

  if (small) {
    return (
      <span className="text-xs text-slate-500 font-mono">
        {h}h {m}m {s}s
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {[h, m, s].map((val, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-white/20 backdrop-blur-sm text-white font-bold text-lg px-2 py-1 rounded-lg min-w-10 text-center font-mono">
            {val}
          </span>
          {i < 2 && <span className="text-white font-bold text-lg">:</span>}
        </span>
      ))}
    </div>
  );
}
