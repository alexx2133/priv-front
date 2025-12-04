import { api } from "./config";

export const historyService = {
  getAll: (): Promise<any> => api.get("/history"),
};
