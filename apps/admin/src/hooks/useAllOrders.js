import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useAllOrders() {
  return useQuery({
    queryKey: ["admin-all-orders"],
    queryFn: async () => {
      const res = await api.get("/orders/admin");
      return res.data.data;
    },
  });
}
