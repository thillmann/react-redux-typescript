import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMap,
  tap
} from "rxjs/operators";
import { IRootState, RootActions } from "src/store";
import { search } from "src/utils/api";
import { isActionOf } from "typesafe-actions";
import * as Location from "../location";
import * as actions from "./restaurants.actions";

const searchLocationEpic: Epic<
  RootActions,
  RootActions,
  IRootState
> = action$ =>
  action$.pipe(
    filter(isActionOf(Location.fetchLocationSuccess)),
    map(({ payload: { cityId } }) => actions.search("", cityId))
  );

const searchEpic: Epic<RootActions, RootActions, IRootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.search)),
    debounceTime(500),
    mergeMap(({ payload: { searchTerm, cityId } }) =>
      from(search(searchTerm, cityId)).pipe(
        map(response =>
          response.data.restaurants.map(wrapper => wrapper.restaurant)
        ),
        map(restaurants => actions.searchSuccess(restaurants)),
        catchError(error => of(actions.searchError(error)))
      )
    )
  );

const getRestaurantEpic: Epic<
  RootActions,
  RootActions,
  IRootState
> = action$ =>
  action$.pipe(
    filter((action): action is LocationChangeAction => action.type === LOCATION_CHANGE),
    filter(({ payload: { location } }) => location.pathname.startsWith('/restaurant')),
    // tslint:disable-next-line:no-console
    tap(action => console.warn('action', action)),
    // get restaurant for id
    filter(() => false)
  );

export const epics = combineEpics(searchEpic, searchLocationEpic, getRestaurantEpic);
