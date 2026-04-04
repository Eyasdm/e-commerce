import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export const useBundles = () => {
  return useQuery({
    queryKey: ["bundles"],

    queryFn: async () => {
      const res = await api.get("/bundles");

      return res.data.data.map((b) => ({
        id: b._id,
        name: b.name,
        description: b.description,
        image: b.image,
        rating: b.rating,

        originalPrice: b.originalPrice,
        bundlePrice: b.bundlePrice,
        savings: b.savings,

        products: b.products,
      }));
    },

    staleTime: 1000 * 60 * 5,
  });
};
