"use client";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../lib/authService";

export function useLogin() {
  const { checkAuth } = useAuth();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      await checkAuth(); // ← re-fetch /me after login to hydrate AuthContext
    },
  });
}

export function useRegister() {
  const { checkAuth } = useAuth();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: async () => {
      await checkAuth();
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}

export function useForgotPassword() {
  return useMutation({ mutationFn: authApi.forgotPassword });
}

export function useResetPassword() {
  return useMutation({ mutationFn: authApi.resetPassword });
}

export function useUpdatePassword() {
  return useMutation({ mutationFn: authApi.updatePassword });
}
