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
  cuisines: string;
  price_range: number;
  user_rating: {
    aggregate_rating: number;
    rating_text: string;
    rating_color: string;
    votes: number;
  };
  featured_image: string;
  menu_url: string;
}
