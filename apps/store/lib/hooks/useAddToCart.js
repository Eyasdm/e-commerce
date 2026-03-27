"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/services/cartService";
import { CART_KEY } from "./useCart";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.addItem,

    // Optimistic update — instantly add the item in the UI
    onMutate: async ({ productId, quantity = 1 }) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const previous = queryClient.getQueryData(CART_KEY);

      queryClient.setQueryData(CART_KEY, (old = []) => {
        const existing = old.find((i) => i.productId === productId);
        if (existing) {
          return old.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        // Partial item until server confirms — server refetch fills the rest
        return [...old, { productId, quantity, id: `temp-${productId}` }];
      });

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(CART_KEY, ctx.previous);
    },

    // Always re-sync with server after add
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
