import { api } from "./config";

export const galleryService = {
  getAll: (): Promise<any> => api.get("/gallery/albums-with-photos"),
};
export const galleryServiceVideo = {
  getAll: (): Promise<any> => api.get("/gallery/video/albums-with-videos"),
};