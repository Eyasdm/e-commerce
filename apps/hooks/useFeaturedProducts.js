import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featuredProducts"],

    queryFn: async () => {
      const res = await api.get("/products?featured=true&limit=4");

      return res.data.data.map((p) => ({
        id: p._id,
        name: p.name,
        image: p.image,
        price: p.price,
        oldPrice: p.oldPrice,
        discount: p.discount,
        rating: p.rating,
        reviews: p.reviews || 0,
      }));
    },

    staleTime: 1000 * 60 * 5,
  });
};
