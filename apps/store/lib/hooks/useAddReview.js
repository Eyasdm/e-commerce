import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

export function useAddReview(productId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rating, comment, orderId }) =>
      api.post(`/products/${productId}/reviews`, { rating, comment, orderId }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      toast.success("Review submitted!");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit review.");
    },
  });
}
