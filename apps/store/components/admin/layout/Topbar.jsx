"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useAuth } from "@/context/AdminAuthContext";

const pageTitles = {
  "/admin/overview": "Overview",
  "/admin/orders": "Orders",
  "/admin/products": "Products",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
  "/admin/account": "Account",
};

export default function Topbar() {
  const pathname = usePathname();
  const { admin } = useAuth();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-400">
          Welcome back, {admin?.name?.split(" ")[0]}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition">
          <Bell size={16} />
        </button>
        <Link
          href="/account"
          className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:bg-blue-700 transition"
        >
          {admin?.name?.[0]?.toUpperCase()}
        </Link>
      </div>
    </header>
  );
}
