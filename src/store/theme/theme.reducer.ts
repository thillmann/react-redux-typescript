import { Reducer } from 'redux';
import { createSelector } from 'reselect';
import { ActionType, getType } from 'typesafe-actions';
import ThemeMap, { Theme } from './theme';
import * as actions from './theme.actions';

export type Action = ActionType<typeof actions>;

export const reducer: Reducer<Theme> = (
  state: Theme = Theme.LIGHT,
  action: Action
) => {
  switch (action.type) {
    case getType(actions.changeTheme):
      return state === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  }
  return state;
};

export const getTheme = createSelector(
  (state: Theme) => state,
  state => ThemeMap[state]
);
