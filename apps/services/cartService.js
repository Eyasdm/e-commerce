import api from "@/lib/api";

export const cartApi = {
  getCart: async () => {
    const { data } = await api.get("/cart");
    return data.data;
  },

  addItem: async ({ productId, quantity = 1 }) => {
    const { data } = await api.post("/cart", { productId, quantity });
    return data.data;
  },

  updateItem: async ({ productId, quantity }) => {
    const { data } = await api.put("/cart", { productId, quantity });
    return data.data;
  },

  removeItem: async (productId) => {
    await api.delete(`/cart/${productId}`);
  },
};
