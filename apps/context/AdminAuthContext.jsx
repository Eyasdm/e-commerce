"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/v1/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        const user = data?.data?.user ?? data?.user;
        if (user?.role === "admin") {
          setAdmin(user);
        } else {
          router.push("/auth");
        }
      })
      .catch(() => {
        router.push("/auth");
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setAdmin(null);
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return null;

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
