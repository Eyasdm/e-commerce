import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      console.log("product response:", data); // 👈
      return data.data;
    },
    enabled: !!id,
  });
}
