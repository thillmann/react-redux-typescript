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
import * as Location from './store/location';
import * as Restaurants from './store/restaurants';
import themeReducer, { Theme, ThemeAction } from './theme';

interface IRootStateWithoutRouter {
  location: Location.IState;
  restaurants: Restaurants.IState;
  theme: Theme;
}

export interface IRootState extends IRootStateWithoutRouter {
  router: RouterState;
}

export type RootActions = Location.Action | Restaurants.Action | ThemeAction;

export const history = createBrowserHistory();
export const rootEpic = combineEpics(Location.epics, Restaurants.epics);
export const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers<IRootStateWithoutRouter, RootActions>({
  location: Location.reducer,
  restaurants: Restaurants.reducer,
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

store.dispatch(Location.fetchLocation());

export default store;
