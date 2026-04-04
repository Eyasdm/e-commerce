"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/services/cartService";
import api from "@/lib/api";
import { CART_KEY } from "./useCart";
import toast from "react-hot-toast";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    // supports both productId (string) and itemId (object {itemId})
    mutationFn: (payload) => {
      if (payload?.itemId) {
        return api.delete(`/cart/item/${payload.itemId}`);
      }
      return cartApi.removeItem(payload); // existing: /cart/:productId
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const previous = queryClient.getQueryData(CART_KEY);
      queryClient.setQueryData(CART_KEY, (old = []) =>
        old.filter((item) =>
          payload?.itemId
            ? item.id !== payload.itemId
            : item.productId !== payload,
        ),
      );
      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(CART_KEY, ctx.previous);
      toast.error("Failed to remove item.");
    },

    onSuccess: () => {
      toast.success("Item removed.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}
