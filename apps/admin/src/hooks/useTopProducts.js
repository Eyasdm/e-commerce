import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useTopProducts(range) {
  const params = range ? `?range=${range}` : "";
  return useQuery({
    queryKey: ["admin-top-products", range],
    queryFn: async () => {
      const res = await api.get(`/admin/analytics/top-products${params}`);
      return res.data.data;
    },
  });
}
