import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useOrdersStats(range) {
  const params = range ? `?range=${range}` : "";
  return useQuery({
    queryKey: ["admin-orders-stats", range],
    queryFn: async () => {
      const res = await api.get(`/admin/analytics/orders${params}`);
      return res.data.data;
    },
  });
}
