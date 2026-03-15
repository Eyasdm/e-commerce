import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [
    {
      id: 1,
      name: "Wireless Noise-Cancelling Headphones",
      price: 169,
      quantity: 1,
      image: "/products/headphones.png",
    },
  ],

  increase: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    })),

  remove: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));
