import { api } from "./config";

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  position: number;
  is_active: boolean;
  created_at: string;
}

export interface BannersResponse {
  banners: Banner[];
  count: number;
}

export const bannersService = {
  getOne: (id: number): Promise<any> => api.get(`/banners/${id}`),
  getActive: (group_id?: number): Promise<BannersResponse> => {
    const queryParams = `?group_id=${group_id}&results=active`;
    return api.get(`/banners${queryParams}`);
  },
};
