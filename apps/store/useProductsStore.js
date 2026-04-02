import { create } from "zustand";

export const useProductsStore = create((set, get) => ({
  products: [],
  page: 1,
  hasMore: true,

  loading: false,
  initialLoading: false,

  filters: {},

  //  Set Filters
  setFilters: (filters) => {
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  // Fetch Products
  fetchProducts: async (pageToFetch = 1, newFilters = null) => {
    const { products, filters } = get();

    const appliedFilters = newFilters || filters;

    try {
      if (pageToFetch === 1) {
        set({ initialLoading: true, filters: appliedFilters });
      } else {
        set({ loading: true });
      }

      const params = {
        page: pageToFetch,
      };

      Object.entries(appliedFilters || {}).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== "undefined"
        ) {
          params[key] = value;
        }
      });

      const query = new URLSearchParams(params).toString();

      const res = await fetch(`/api/v1/products?${query}`);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      set((state) => {
        const combined =
          pageToFetch === 1 ? data.data : [...state.products, ...data.data];

        const uniqueProducts = Array.from(
          new Map(combined.map((p) => [p._id, p])).values(),
        );

        return {
          products: uniqueProducts,
          page: pageToFetch,
          hasMore: data.page < data.pages,
          loading: false,
          initialLoading: false,
        };
      });
    } catch (error) {
      console.error("Fetch error:", error);

      set({
        loading: false,
        initialLoading: false,
      });
    }
  },

  // ➕ Load More
  loadMore: () => {
    const { page, hasMore, loading } = get();

    if (!hasMore || loading) return;

    get().fetchProducts(page + 1);
  },

  // 🔄 Reset
  reset: () => {
    set({
      products: [],
      page: 1,
      hasMore: true,
    });
  },
}));
