import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartService";
import { CART_KEY } from "./useCart";
import toast from "react-hot-toast";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      cartApi.addItem({ productId, quantity }),

    onMutate: async ({ productId }) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const previous = queryClient.getQueryData(CART_KEY);

      queryClient.setQueryData(CART_KEY, (old = []) => {
        const exists = old.find((item) => item.productId === productId);
        if (exists) {
          //  Only optimistically update quantity if item already exists
          return old.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        // ✅ Don't optimistically add new items — wait for server response
        return old;
      });

      return { previous };
    },
    // ✅ Rollback on error
    onError: (err, _, context) => {
      queryClient.setQueryData(CART_KEY, context.previous);
      toast.error("Failed to add item. Please try again.");
    },

    // ✅ Refetch after settle
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },

    onSuccess: () => {
      toast.success("Item added to cart!");
    },
  });
}
