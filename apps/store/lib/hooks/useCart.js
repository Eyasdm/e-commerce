"use client";
import { useQuery } from "@tanstack/react-query";
import { cartApi } from "@/lib/cartService";
import { useAuth } from "@/context/AuthContext";

export const CART_KEY = ["cart"];

const normalizeCart = (cart) =>
  cart.items
    .filter((item) => item.product !== null)
    .map((item) => ({
      id: item._id,
      productId: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      oldPrice: item.product.oldPrice ?? null,
      discount: item.product.discount ?? 0,
      quantity: item.quantity,
    }));

export function useCart() {
  const { isAuthenticated, loading } = useAuth();

  return useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      const cart = await cartApi.getCart();
      return normalizeCart(cart);
    },
    enabled: !loading && isAuthenticated, // ✅ wait until check is done
    staleTime: 1000 * 60 * 2,
  });
}
