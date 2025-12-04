import { api } from "./config";

export const newsService = {
  getAll: (): Promise<any> => api.get("/news"),
  getOne: (id: number): Promise<any> => api.get(`/news/${id}`),
};
