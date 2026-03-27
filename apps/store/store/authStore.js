import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),

  setAuth: (user, token) => {
    Cookies.set("token", token);
    set({ user, token, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  clearAuth: () => {
    Cookies.remove("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
