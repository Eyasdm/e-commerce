"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/services/cartService";
import { CART_KEY } from "./useCart";
import toast from "react-hot-toast";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.updateItem,

    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const previous = queryClient.getQueryData(CART_KEY);
      queryClient.setQueryData(CART_KEY, (old = []) =>
        old.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      );
      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(CART_KEY, ctx.previous);
      toast.error("Failed to update quantity.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
