import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api/axios";

const DEV_MODE = true;

const MOCK_ADMIN = {
  name: "Eyas Mohammed",
  email: "admin@test.com",
  role: "admin",
};

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function AdminAuthProvider({ children }) {
  // ✅ Initialize directly — no useEffect needed in dev mode
  const [admin, setAdmin] = useState(DEV_MODE ? MOCK_ADMIN : null);
  const [loading, setLoading] = useState(!DEV_MODE);

  useEffect(() => {
    if (DEV_MODE) return; // skip in dev

    api
      .get("/auth/me")
      .then((res) => {
        const user = res.data?.data?.user;
        if (user?.role === "admin") {
          setAdmin(user);
        } else {
          setAdmin(null);
        }
      })
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    if (!DEV_MODE) {
      await api.post("/auth/logout");
    }
    setAdmin(null);
    window.location.href = "http://localhost:3000/auth";
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
