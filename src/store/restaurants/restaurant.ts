export interface IRestaurant {
  id: number;
  name: string;
  location: {
    address: string;
    locality: string;
    city: string;
    city_id: number;
    latitude: number;
    longitude: number;
    zipcode: number;
    country_id: number;
    locality_verbose: string;
  };
}
