import { api } from './config';

export const settingsService = {
  getAll: (): Promise<any> => 
    api.get('/settings'),
};