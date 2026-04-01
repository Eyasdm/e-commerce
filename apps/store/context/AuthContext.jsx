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

  const checkAuth = useCallback(() => {
    setLoading(true);
    return fetch(`${API}/auth/me`, {
      // 👈 return the promise
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        const userData = data?.data?.user || data?.user || data;
        setUser(userData);
        setIsAuthenticated(true);
        return userData; // 👈 return user so LoginForm can read role
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
        return null; //  return null on failure
      })
      .finally(() => setLoading(false));
  }, []);

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
