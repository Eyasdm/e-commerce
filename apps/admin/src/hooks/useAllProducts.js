import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useAllProducts({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: ["admin-all-products", page, limit],
    queryFn: async () => {
      const res = await api.get(`/products?page=${page}&limit=${limit}`);

      // Backend shape: { success, data: [...], page, pages, results, total }
      const raw = res.data;

      return {
        products: raw.data ?? [],
        total: raw.total ?? 0,
        pages: raw.pages ?? 1,
        page: raw.page ?? page,
      };
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
}
