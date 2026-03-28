"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartService";
import { CART_KEY } from "./useCart";
import toast from "react-hot-toast";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartApi.removeItem,

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
