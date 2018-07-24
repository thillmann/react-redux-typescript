import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import projectReducer, { IProjectState, ProjectAction } from './projects';
import { changeProjectEpic } from './projects/project.epic';
import themeReducer, { Theme } from './theme';

export interface IRootState {
  projects: IProjectState;
  theme: Theme;
}

export type RootActions = ProjectAction;

export const rootEpic = combineEpics(changeProjectEpic);
export const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers<IRootState, RootActions>({
  projects: projectReducer,
  theme: themeReducer
});

function configureStore(initialState?: any): Store<IRootState, RootActions> {
  return createStore(rootReducer, applyMiddleware(epicMiddleware));
}

const store = configureStore();

epicMiddleware.run(rootEpic as any);

export default store;
