"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../authService";
import { useAuthStore } from "@/store/authStore";

// ── Query Keys ────────────────────────────────────────────────────────────────
export const AUTH_KEYS = {
  me: ["auth", "me"],
};

// ── useMe ─────────────────────────────────────────────────────────────────────
// Fetches the currently authenticated user. Only runs when a token exists.
export function useMe() {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: async () => {
      const data = await authApi.getMe();
      setUser(data.data?.user ?? data.user ?? data);
      return data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

// ── useLogin ──────────────────────────────────────────────────────────────────
export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Adapt to your backend's response shape: { token, data: { user } } or { token, user }
      const token = data.token;
      const user = data.data?.user ?? data.user;

      if (token) {
        localStorage.setItem("token", token);
        setAuth(user, token);
      }

      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });
}

// ── useRegister ───────────────────────────────────────────────────────────────
export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      const token = data.token;
      const user = data.data?.user ?? data.user;

      if (token) {
        localStorage.setItem("token", token);
        setAuth(user, token);
      }

      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });
}

// ── useLogout ─────────────────────────────────────────────────────────────────
export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      // Always clear locally even if the request fails
      localStorage.removeItem("token");
      clearAuth();
      queryClient.clear();
    },
  });
}

// ── useForgotPassword ─────────────────────────────────────────────────────────
export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

// ── useResetPassword ──────────────────────────────────────────────────────────
export function useResetPassword() {
  return useMutation({
    mutationFn: authApi.resetPassword,
  });
}

// ── useUpdatePassword ─────────────────────────────────────────────────────────
export function useUpdatePassword() {
  return useMutation({
    mutationFn: authApi.updatePassword,
  });
}
