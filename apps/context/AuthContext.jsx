"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const API = process.env.NEXT_PUBLIC_API_URL;

  // context/AuthContext.jsx
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      const userData = data?.data?.user || data?.user || data;
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } finally {
      setLoading(false);
    }
  }, []); // ← API URL is now read directly, no stale closure

  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // ← add checkAuth to deps

  useEffect(() => {
    checkAuth();
  }, []);

  const clearAuth = () => {
    fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed. Please try again."))
      .finally(() => {
        setUser(null);
        setIsAuthenticated(false);
        queryClient.clear();
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        setUser,
        setIsAuthenticated,
        clearAuth,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
