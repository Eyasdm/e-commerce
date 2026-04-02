"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const { checkAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hydrate = async () => {
      const token = searchParams.get("token");

      if (!token) {
        router.replace("/auth?error=no_token");
        return;
      }

      // Set cookie from same domain (clears old one first)
      const res = await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      if (!res.ok) {
        router.replace("/auth?error=cookie_failed");
        return;
      }

      // Small delay to ensure cookie is flushed
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Re-hydrate auth with fresh cookie
      const userData = await checkAuth();

      console.log("OAuth hydrated user:", userData?.email, userData?.role);

      if (userData?.role === "admin") {
        router.replace("/admin/overview");
      } else {
        router.replace("/");
      }
    };

    hydrate();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}
