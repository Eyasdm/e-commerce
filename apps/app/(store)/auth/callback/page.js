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

      // Hit a Next.js API route to set the httpOnly cookie from same domain
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });

      // Now re-hydrate auth context
      const userData = await checkAuth();

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
