import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useMyOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data.data;
    },
  });
}
