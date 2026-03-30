"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useContact() {
  return useMutation({
    mutationFn: async ({ name, email, subject, message }) => {
      const { data } = await api.post("/contact", { name, email, subject, message });
      return data;
    },
  });
}
