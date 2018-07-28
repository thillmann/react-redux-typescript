import { createAction } from 'typesafe-actions';
import { IRestaurant } from './restaurant';

export const search = createAction(
  '@@restaurants/SEARCH',
  resolve => (searchTerm: string, cityId: number) =>
    resolve({
      cityId,
      searchTerm
    })
);
export const searchSuccess = createAction(
  '@@restaurants/SEARCH_SUCCESS',
  resolve => (result: IRestaurant[]) => resolve(result)
);
export const searchError = createAction(
  '@@restaurants/SEARCH_ERROR',
  resolve => (error: any) => resolve(error)
);
