"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api/axios";

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        const user = res.data?.data?.user ?? res.data?.user;
        if (user?.role === "admin") {
          setAdmin(user);
        } else {
          setAdmin(null);
          window.location.href = "/auth";
        }
      })
      .catch(() => {
        setAdmin(null);
        window.location.href = "/auth";
      })
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setAdmin(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
