"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartService";
import { CART_KEY } from "./useCart";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.updateItem, // { productId, quantity }

    // Optimistic update — snap the quantity immediately
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
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
