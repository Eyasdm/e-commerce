"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function AuthCallbackInner() {
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

      try {
        // Set cookie via Next.js server route (same domain as Vercel)
        await fetch("/api/auth/set-cookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include",
        });

        // Now checkAuth will work because cookie is on Vercel domain
        const user = await checkAuth();

        if (user?.role === "admin") {
          router.replace("/admin/overview");
        } else {
          router.replace("/");
        }
      } catch (err) {
        router.replace("/auth?error=hydration_failed");
      }
    };

    hydrate();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
