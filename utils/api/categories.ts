import { api } from './config';

export interface Category {
  id: number;
  name: string;
  sort: number;
  parent_id: number | null;
}

export interface CategoriesResponse {
  categories: Category[];
  count: number;
}

export const categoriesService = {
  getAll: (): Promise<CategoriesResponse> => 
    api.get('/categories'),
};