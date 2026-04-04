import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api(`/products?${new URLSearchParams(params).toString()}`),
  });
};
