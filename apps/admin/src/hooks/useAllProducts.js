import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useAllProducts() {
  return useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data.data;
    },
  });
}
