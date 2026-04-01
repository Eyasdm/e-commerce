import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

export function useDailySales(range) {
  const params = range ? `?range=${range}` : "";
  return useQuery({
    queryKey: ["admin-daily-sales", range],
    queryFn: async () => {
      const res = await api.get(`/admin/analytics/daily-sales${params}`);
      return res.data.data;
    },
  });
}
