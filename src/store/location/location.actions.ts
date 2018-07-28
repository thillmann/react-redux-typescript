import { createAction } from 'typesafe-actions';

export const fetchLocation = createAction('@@location/FETCH');
export const fetchLocationSuccess = createAction(
  '@@location/FETCH_SUCCESS',
  resolve => (cityId: number, cityName: string) => resolve({ cityId, cityName })
);
export const fetchLocationError = createAction('@@location/FETCH_ERROR');
