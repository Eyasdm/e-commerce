import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { CART_KEY } from "./useCart";
import toast from "react-hot-toast";

export function useAddBundleToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bundleId) => api.post(`/cart/bundle/${bundleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Bundle added to cart!");
    },
    onError: () => {
      toast.error("Failed to add bundle.");
    },
  });
}
