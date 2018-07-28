import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMap
} from 'rxjs/operators';
import { IRootState, RootActions } from 'src/store';
import { search } from 'src/utils/api';
import { isActionOf } from 'typesafe-actions';
// import * as Location from '../location';
import * as actions from './restaurants.actions';

// const searchLocationEpic: Epic<RootActions, RootActions, IRootState> = (
//   action$,
//   state$
// ) =>
//   action$.pipe(
//     filter(isActionOf(Location.fetchLocation)),
//     switchMapTo(state$),
//     filter(state => !!state.location.cityId),
//     map(state => state.location.cityId!),
//     map(cityId => actions.search('', cityId))
//   );

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

export const epics = combineEpics(searchEpic);
