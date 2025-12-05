// stores/app.ts
import { create } from "zustand";
import { categoriesService } from "../utils/api/categories";
import { settingsService } from "../utils/api/settings";
import { bannersService } from "../utils/api/banners";
import { historyService } from "../utils/api/history";
import { newsService } from "../utils/api/news";
interface AppState {
  categories: { data: any[]; loaded: boolean };
  banner: { data: any };
  mainBanners: { data: any[]; loaded: boolean };
  sellerBanners: { data: any[]; loaded: boolean };
  customerBanners: { data: any[]; loaded: boolean };
  settings: { data: any; loaded: boolean };
  history: { data: any[]; loaded: boolean };
  post: { data: any };
  news: { data: any[]; loaded: boolean };
  loadHistory: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadPost: (id: number) => Promise<void>;
  loadBanner: (id: number) => Promise<void>;
  loadBanners: (group_id: number) => Promise<void>;
  loadNews: () => Promise<void>;
  loadSettings: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  categories: { data: [], loaded: false },
  mainBanners: { data: [], loaded: false },
  sellerBanners: { data: [], loaded: false },
  customerBanners: { data: [], loaded: false },
  settings: { data: {}, loaded: false },
  banner: { data: {} },
  post: { data: {} },
  news: { data: [], loaded: false },
  history: { data: [], loaded: false },
  loadHistory: async () => {
    const state = get();
    if (state.history.loaded) return;
    try {
      const data = await historyService.getAll();
      set({ history: { data: data.histories, loaded: true } });
    } catch (error) {
      console.error("Error loading history:", error);
    }
  },
  loadCategories: async () => {
    const state = get();
    if (state.categories.loaded) return;
    try {
      const data = await categoriesService.getAll();
      set({ categories: { data: data.categories, loaded: true } });
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  },

  loadBanners: async (group_id: number) => {
    const state = get();
    if (state.mainBanners.loaded && group_id === 1) return;
    if (state.customerBanners.loaded && group_id === 2) return;
    if (state.sellerBanners.loaded && group_id === 3) return;
    try {
      const data = await bannersService.getActive(group_id);
      if (group_id === 1) {
        set({ mainBanners: { data: data.banners, loaded: true } });
      } else if (group_id === 2) {
        set({ customerBanners: { data: data.banners, loaded: true } });
      } else if (group_id === 3) {
        set({ sellerBanners: { data: data.banners, loaded: true } });
      }
    } catch (error) {
      console.error("Error loading banners:", error);
    }
  },
  loadNews: async () => {
    const state = get();
    if (state.news.loaded) return;
    try {
      const data = await newsService.getAll();
      set({ news: { data: data.news, loaded: true } });
    } catch (error) {
      console.error("Error loading news:", error);
    }
  },
  loadPost: async (id: number) => {
    try {
      const data = await newsService.getOne(id);
      set({ post: { data: data.news } });
    } catch (error) {
      console.error("Error loading news:", error);
    }
  },
  loadBanner: async (id: number) => {
    if (isNaN(id)) return;
    try {
      const data = await bannersService.getOne(id);
      set({ banner: { data: data.banner } });
    } catch (error) {
      console.error("Error loading news:", error);
    }
  },
  loadSettings: async () => {
    const state = get();
    if (state.settings.loaded) return;
    try {
      const data = await settingsService.getAll();
      set({ settings: { data: data.settings, loaded: true } });
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  },
}));
