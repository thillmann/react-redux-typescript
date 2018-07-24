import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';
import { ActionType, getType } from 'typesafe-actions';
import { IProject } from './project';
import * as actions from './project.actions';

export type ProjectAction = ActionType<typeof actions>;

interface IProjectEntityState {
  [id: string]: Readonly<IProject>;
}

type IProjectListState = ReadonlyArray<string>;

export interface IProjectState {
  entities: IProjectEntityState;
  list: IProjectListState;
}

const projectEntityReducer: Reducer<IProjectEntityState> = (
  state: IProjectEntityState = {},
  action: ProjectAction
) => {
  switch (action.type) {
    case getType(actions.addProject):
      return { ...state, [action.payload.id]: action.payload };
    case getType(actions.removeProject):
      const { [action.payload]: deletedProject, ...newState } = state;
      return newState;
  }
  return state;
};

const projectListReducer: Reducer<IProjectListState> = (
  state: IProjectListState = [],
  action: ProjectAction
) => {
  switch (action.type) {
    case getType(actions.addProject):
      return [...state, action.payload.id];
    case getType(actions.removeProject):
      return state.filter(id => id !== action.payload);
  }
  return state;
};

export const getProjectEntities = (state: IProjectState) => state.entities;

export const getProjectList = (state: IProjectState) => state.list;

export const getProjects = createSelector(
  getProjectEntities,
  getProjectList,
  (entities, list) => list.map(id => entities[id])
);

export default combineReducers<IProjectState, ProjectAction>({
  entities: projectEntityReducer,
  list: projectListReducer
});
