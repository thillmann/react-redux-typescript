import {
  connectRouter,
  routerMiddleware,
  RouterState
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store
} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import projectReducer, { IProjectState, ProjectAction } from './projects';
import { changeProjectEpic } from './projects/project.epic';
import themeReducer, { Theme, ThemeAction } from './theme';

interface IRootStateWithoutRouter {
  projects: IProjectState;
  theme: Theme;
}

export interface IRootState extends IRootStateWithoutRouter {
  router: RouterState;
}

export type RootActions = ProjectAction & ThemeAction;

export const history = createBrowserHistory();
export const rootEpic = combineEpics(changeProjectEpic);
export const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers<IRootStateWithoutRouter, RootActions>({
  projects: projectReducer,
  theme: themeReducer
});

function configureStore(initialState?: any): Store<IRootState, AnyAction> {
  return createStore(
    connectRouter(history)<any>(rootReducer),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), epicMiddleware))
  );
}

const store = configureStore();

epicMiddleware.run(rootEpic as any);

export default store;
