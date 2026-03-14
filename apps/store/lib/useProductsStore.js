import { create } from "zustand";
import { generateMockProducts } from "@/lib/mockProducts";

export const useProductsStore = create((set, get) => ({
  products: [],
  page: 1,
  hasMore: true,

  loading: false,
  initialLoading: false,

  filters: {},

  setFilters: (filters) => {
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  fetchProducts: async (pageToFetch = 1) => {
    const { products, filters } = get();

    if (pageToFetch === 1) {
      set({ initialLoading: true });
    } else {
      set({ loading: true });
    }

    await new Promise((res) => setTimeout(res, 800));

    const data = generateMockProducts(pageToFetch, 12, filters);

    set({
      products:
        pageToFetch === 1 ? data.products : [...products, ...data.products],

      page: pageToFetch,
      hasMore: data.hasMore,

      loading: false,
      initialLoading: false,
    });
  },

  loadMore: () => {
    const { page, hasMore, loading } = get();

    if (!hasMore || loading) return;

    const nextPage = page + 1;

    get().fetchProducts(nextPage);
  },

  reset: () => {
    set({
      products: [],
      page: 1,
      hasMore: true,
      loading: false,
      initialLoading: false,
    });
  },
}));
