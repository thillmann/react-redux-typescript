import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './location.actions';

export type Action = ActionType<typeof actions>;

export interface IState {
  cityId: number | null;
  cityName: string | null;
  loading: boolean;
}

const initialState: IState = {
  cityId: null,
  cityName: null,
  loading: false
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
        loading: true
      };
    case getType(actions.fetchLocationSuccess):
      return {
        cityId: action.payload.cityId,
        cityName: action.payload.cityName,
        loading: false
      };
    case getType(actions.fetchLocationError):
      return {
        cityId: null,
        cityName: null,
        loading: false
      };
  }
  return state;
};
