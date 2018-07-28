import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { ActionType, getType } from 'typesafe-actions';
import { IRestaurant } from './restaurant';
import * as actions from './restaurants.actions';

export type Action = ActionType<typeof actions>;

export interface IState {
  entities: {
    [id: number]: IRestaurant;
  };
  loading: boolean;
  searchResult: number[];
  searchTerm: string;
}

const initialState: IState = {
  entities: {},
  loading: false,
  searchResult: [],
  searchTerm: ''
};

export const reducer: Reducer<IState> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case getType(actions.search):
      return {
        ...state,
        loading: true,
        searchTerm: action.payload.searchTerm
      };
    case getType(actions.searchSuccess):
      return {
        ...state,
        entities: action.payload.reduce(
          (allEntities, restaurant) => ({
            ...allEntities,
            [restaurant.id]: restaurant
          }),
          state.entities
        ),
        loading: false,
        searchResult: action.payload.map(restaurant => restaurant.id)
      };
    case getType(actions.searchError):
      return {
        ...state,
        loading: false
      };
  }
  return state;
};

export const getSearchResult = createSelector(
  (state: IState) => state.searchResult,
  (state: IState) => state.entities,
  (result, entities) => result.map(id => entities[id])
);
