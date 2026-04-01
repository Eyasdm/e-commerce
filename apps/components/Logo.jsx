"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img
        src="/logo-without-background.png"
        alt="TechNest Logo"
        width={34}
        height={34}
      />
      <span className="text-lg font-semibold tracking-tight">TechNest</span>
    </Link>
  );
}
