"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The HttpOnly cookie is sent automatically by the browser
    // Just call a protected endpoint to check if we're logged in
    fetch("http://localhost:8000/api/v1/auth/me", {
      credentials: "include", // ✅ sends HttpOnly cookies automatically
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setUser(data.user || data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const clearAuth = () => {
    fetch("http://localhost:8000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      setUser(null);
      setIsAuthenticated(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
