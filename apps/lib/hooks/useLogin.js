"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/auth/login", data, {
        withCredentials: true, // important if using cookies
      });

      return res.data;
    },
  });
};
