import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => api("/cart"),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      api("/cart", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
