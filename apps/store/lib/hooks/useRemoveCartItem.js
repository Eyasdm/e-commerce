"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartService";
import { CART_KEY } from "./useCart";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.removeItem, // productId string

    // Optimistic update — remove from UI instantly
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const previous = queryClient.getQueryData(CART_KEY);

      queryClient.setQueryData(CART_KEY, (old = []) =>
        old.filter((item) => item.productId !== productId),
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(CART_KEY, ctx.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
