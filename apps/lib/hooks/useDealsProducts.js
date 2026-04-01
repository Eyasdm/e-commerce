import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useDealsProducts = () => {
  return useQuery({
    queryKey: ["dealsProducts"],

    queryFn: async () => {
      const res = await api.get("/products?discount=true&limit=8");

      return res.data.data.map((p) => ({
        id: p._id,
        name: p.name,
        image: p.image,
        rating: p.rating,
        reviews: p.reviews || 0,

        discount: p.discount,
        originalPrice: p.oldPrice || p.price,
        salePrice: p.price,

        endsIn: p.discountExpiresAt
          ? Math.max(
              0,
              Math.floor((new Date(p.discountExpiresAt) - new Date()) / 1000),
            )
          : 3600,
      }));
    },

    staleTime: 1000 * 60 * 5,
  });
};
