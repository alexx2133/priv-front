import { create } from "zustand";
import { formatDate } from "../utils/utils";
import { API_URL } from "../utils/api/config";

interface Product {
  id: number;
  category_id: number;
  name: string;
  opt_price_min: string;
  opt_price_max: string;
  opt_unit: number;
  rozn_price_min: string;
  rozn_price_max: string;
  rozn_unit: number;
  image: string;
  changed: string;
}

interface ProductsState {
  data: Product[];
  loaded: boolean;
  selectedCategoryId: number | null;
  searchQuery: string;
  visibleCount: number;
  date: { date: string; time: string };
  productsPerLoad: number;
  loadProducts: () => Promise<void>;
  setCategory: (categoryId: number | null) => void;
  setSearchQuery: (query: string) => void;
  loadMore: () => void;
  getVisibleProducts: () => Product[];
  updateTime: () => Promise<void>;
  getFilteredProducts: () => Product[];
  hasMore: () => boolean;
  downloadPriceList: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  data: [],
  loaded: false,
  selectedCategoryId: null,
  searchQuery: "",
  visibleCount: 30,
  productsPerLoad: 30,
  date: { date: "", time: "" },
  loadProducts: async () => {
    const state = get();
    if (state.loaded) return;

    try {
      const response = await fetch(API_URL + "/products");
      if (!response.ok) throw new Error("Failed to load products");

      const data = await response.json();
      const productsWithPrice = data.products.filter(
        (product: Product) =>
          parseFloat(product.rozn_price_min) > 0 ||
          parseFloat(product.rozn_price_max) > 0 ||
          parseFloat(product.opt_price_min) > 0 ||
          parseFloat(product.opt_price_max) > 0
      );

      set({
        data: productsWithPrice,
        loaded: true,
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  },
  updateTime: async () => {
    try {
      const response = await fetch(
        `${API_URL}/products-history/updates/latest-time`
      );
      if (!response.ok) throw new Error("Failed to fetch update info");
      const data = await response.json();
      set({ date: formatDate(data?.last_manual_update) });
    } catch (err) {
      console.error(err);
    }
  },
  downloadPriceList: async (): Promise<void> => {
    try {
      const response = await fetch(
        API_URL + "/products/download/price-list"
      );

      if (!response.ok) {
        throw new Error("Failed to download price list");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const contentDisposition = response.headers.get("content-disposition");
      let fileName = "price-list.pdf";

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1]);
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading price list:", error);
      alert("Ошибка при скачивании прайс-листа");
    }
  },

  setCategory: (categoryId: number | null) => {
    set({
      selectedCategoryId: categoryId,
      visibleCount: 30,
    });
  },

  setSearchQuery: (query: string) => {
    set({
      searchQuery: query,
      visibleCount: 30,
    });
  },

  loadMore: () => {
    const state = get();
    const filtered = state.getFilteredProducts();
    const nextCount = Math.min(
      state.visibleCount + state.productsPerLoad,
      filtered.length
    );

    if (nextCount > state.visibleCount) {
      set({ visibleCount: nextCount });
    }
  },

  getFilteredProducts: () => {
    const state = get();
    let filtered = state.data;
    if (state.selectedCategoryId) {
      filtered = filtered.filter(
        (product) => product.category_id === state.selectedCategoryId
      );
    }

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  getVisibleProducts: () => {
    const state = get();
    const filtered = state.getFilteredProducts();
    return filtered.slice(0, state.visibleCount);
  },

  hasMore: () => {
    const state = get();
    const filtered = state.getFilteredProducts();
    return state.visibleCount < filtered.length;
  },
}));
