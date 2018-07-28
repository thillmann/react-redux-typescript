import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './location.actions';

export type Action = ActionType<typeof actions>;

export interface IState {
  cityId: number | null;
  cityName: string | null;
  lat: number | null;
  loading: boolean;
  lon: number | null;
}

const initialState: IState = {
  cityId: null,
  cityName: null,
  lat: null,
  loading: false,
  lon: null
};

export const reducer: Reducer<IState> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case getType(actions.fetchLocation):
      return {
        cityId: null,
        cityName: null,
        lat: null,
        loading: true,
        lon: null
      };
    case getType(actions.fetchLocationSuccess):
      return {
        cityId: action.payload.cityId,
        cityName: action.payload.cityName,
        lat: action.payload.lat,
        loading: false,
        lon: action.payload.lon
      };
    case getType(actions.fetchLocationError):
      return {
        cityId: null,
        cityName: null,
        lat: null,
        loading: false,
        lon: null
      };
  }
  return state;
};
