"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin top progress bar that fires on every Next.js route change.
 * Drop this into your root layout — no props needed.
 */
export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);
  const tick = useRef(null);

  const start = () => {
    setVisible(true);
    setProgress(0);

    let p = 0;
    tick.current = setInterval(() => {
      // Simulate organic progress — slows as it approaches 90%
      p += Math.random() * 15 * (1 - p / 100);
      if (p > 90) p = 90;
      setProgress(p);
    }, 200);
  };

  const finish = () => {
    clearInterval(tick.current);
    setProgress(100);
    timer.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  };

  // Fire on every route change
  useEffect(() => {
    start();
    // next.js route changes are synchronous from this hook's perspective
    // so we finish after a short frame delay
    const t = setTimeout(finish, 300);
    return () => {
      clearTimeout(t);
      clearInterval(tick.current);
      clearTimeout(timer.current);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[3px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-200 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
