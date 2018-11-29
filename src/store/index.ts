import {
  connectRouter,
  RouterAction,
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
import * as Location from './location';
import * as Restaurants from './restaurants';
import * as Theme from './theme';

export interface IRootState {
  location: Location.IState;
  restaurants: Restaurants.IState;
  theme: Theme.Theme;
  router: RouterState;
}

export type RootActions = Location.Action | Restaurants.Action | Theme.Action | RouterAction;

export const history = createBrowserHistory();
const rootEpic = combineEpics(Location.epics, Restaurants.epics);
const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers<IRootState, RootActions>({
  location: Location.reducer,
  restaurants: Restaurants.reducer,
  router: connectRouter(history),
  theme: Theme.reducer,
});

function configureStore(initialState?: any): Store<IRootState, AnyAction> {
  return createStore<IRootState, AnyAction, {}, {}>(
    rootReducer,
    initialState,
    compose(applyMiddleware(routerMiddleware(history), epicMiddleware))
  );
}

const store = configureStore();

epicMiddleware.run(rootEpic as any);

export default store;
