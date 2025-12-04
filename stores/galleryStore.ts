// stores/galleryStore.ts
import { create } from "zustand";
import { galleryService, galleryServiceVideo } from "../utils/api/gallery";

export interface Video {
  id: number;
  album_id: number;
  name: string;
  type: string;
  filename: string;
  iframe: string;
  date: string;
}
export interface Photo {
  id: number;
  album_id: number;
  name: string;
  image: string;
  date: string;
}

interface Album {
  id: number;
  name: string;
  sort: number;
  photos: Photo[];
}
interface AlbumVideo {
  id: number;
  name: string;
  sort: number;
  videos: Video[];
}
interface GalleryState {
  allAlbums: Album[];
  allVideoAlbums: AlbumVideo[];
  visibleAlbumsCount: number;
  albumsPerLoad: number;
  error: string | null;
  loadAllAlbums: () => Promise<void>;
  loadAllVideoAlbums: () => Promise<void>;
  loadMoreAlbums: () => void;
  resetVisibleAlbums: () => void;
  getVisibleAlbums: () => Album[];
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  allAlbums: [],
  allVideoAlbums: [],
  visibleAlbumsCount: 2,
  albumsPerLoad: 2,
  error: null,

  loadAllAlbums: async () => {
    try {
      const data = await galleryService.getAll();
      set({ allAlbums: data.albums });
    } catch (error) {
      console.error("Error loading albums:", error);
    }
  },
  loadAllVideoAlbums: async () => {
    try {
      const data = await galleryServiceVideo.getAll();
      set({ allVideoAlbums: data.albums });
    } catch (error) {
      console.error("Error loading albums:", error);
    }
  },
  loadMoreAlbums: () => {
    const { visibleAlbumsCount, allAlbums, albumsPerLoad } = get();
    const nextCount = Math.min(
      visibleAlbumsCount + albumsPerLoad,
      allAlbums.length
    );
    set({ visibleAlbumsCount: nextCount });
  },

  resetVisibleAlbums: () => {
    set({ visibleAlbumsCount: 2 });
  },

  getVisibleAlbums: () => {
    const { allAlbums, visibleAlbumsCount } = get();
    return allAlbums.slice(0, visibleAlbumsCount);
  },
}));
