import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useOrder(id) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}
