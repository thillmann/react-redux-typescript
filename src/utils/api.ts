import axios from 'axios';
import { IRestaurant } from 'src/store/restaurants/restaurant';

const ZOMATO_API_BASE_URL = 'https://developers.zomato.com/api/v2.1';

const api = axios.create({
  baseURL: ZOMATO_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'user-key': process.env.REACT_APP_ZOMATO_KEY
  }
});

interface IGeocodeResponse {
  location: {
    entity_type: string;
    entity_id: number;
    title: string;
    city_id: number;
    city_name: string;
    country_id: number;
    country_name: string;
  };
}

export function geocode(lat: number, lon: number) {
  return api.get<IGeocodeResponse>('geocode', {
    params: {
      lat,
      lon
    }
  });
}

interface ISearchResponse {
  results_found: number;
  results_start: number;
  results_shown: number;
  restaurants: Array<{
    restaurant: IRestaurant;
  }>;
}

export function search(searchTerm: string | undefined, cityId: number) {
  return api.get<ISearchResponse>('/search', {
    params: {
      entity_id: cityId,
      entity_type: 'city',
      q: searchTerm
    }
  });
}

export default api;
