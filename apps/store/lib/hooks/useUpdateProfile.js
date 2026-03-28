import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: async ({ name }) => {
      const { data } = await api.patch("/users/me", { name });
      return data.user;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });
}
