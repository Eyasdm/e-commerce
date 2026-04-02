"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const { checkAuth, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const hydrate = async () => {
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
