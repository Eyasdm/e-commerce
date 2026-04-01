import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

export function useRevenue(range) {
  const params = range ? `?range=${range}` : "";
  return useQuery({
    queryKey: ["admin-revenue", range],
    queryFn: async () => {
      const res = await api.get(`/admin/analytics/revenue${params}`);
      return res.data.data;
    },
  });
}
