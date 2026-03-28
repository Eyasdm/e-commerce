import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useProductReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}/reviews`);
      return data.data;
    },
    enabled: !!productId,
  });
}
