"use client";
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";

export const CART_KEY = ["cart"];

const normalizeCart = (cart) =>
  cart.items
    .filter((item) => item.product !== null || item.bundle !== null)
    .map((item) => {
      // ✅ detect bundle by checking bundle field exists
      const isBundle = !!item.bundle;

      if (isBundle) {
        const bundle = item.bundle;
        return {
          id: item._id,
          bundleId: bundle._id || bundle,
          productId: null,
          name: item.name,
          image: item.image,
          price: item.price,
          discount: 0,
          quantity: item.quantity,
          isBundle: true,
        };
      }

      return {
        id: item._id,
        productId: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        oldPrice: item.product.oldPrice ?? null,
        discount: item.product.discount ?? 0,
        quantity: item.quantity,
        isBundle: false,
      };
    });

export function useCart() {
  const { isAuthenticated, loading } = useAuth();

  return useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      const cart = await cartApi.getCart();
      if (!cart || !cart.items) return [];
      return normalizeCart(cart);
    },
    enabled: !loading && isAuthenticated, // ✅ wait until check is done
    staleTime: 1000 * 60 * 2,
  });
}
