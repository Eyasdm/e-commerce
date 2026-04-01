"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useSingleDeal = (id) => {
  return useQuery({
    queryKey: ["deal", id],

    queryFn: async () => {
      const res = await api.get(`/products/${id}`);

      const p = res.data.data;

      return {
        id: p._id,
        name: p.name,
        image: p.image,
        price: p.price,
        oldPrice: p.oldPrice,
        discount: p.discount,
        rating: p.rating,
        reviews: p.reviews,
        stock: p.stock,
      };
    },

    enabled: !!id,
  });
};
