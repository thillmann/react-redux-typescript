import { createAction } from 'typesafe-actions';

export const fetchLocation = createAction('@@location/FETCH');
export const fetchLocationSuccess = createAction(
  '@@location/FETCH_SUCCESS',
  resolve => (cityId: number, cityName: string, lat: number, lon: number) =>
    resolve({ cityId, cityName, lat, lon })
);
export const fetchLocationError = createAction('@@location/FETCH_ERROR');
