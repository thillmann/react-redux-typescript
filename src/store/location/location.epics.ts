import { combineEpics, Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMapTo } from 'rxjs/operators';
import { IRootState, RootActions } from 'src/store';
import { geocode } from 'src/utils/api';
import getLocation from 'src/utils/geolocation';
import { isActionOf } from 'typesafe-actions';
import * as actions from './location.actions';

const fetchLocationEpic: Epic<RootActions, RootActions, IRootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.fetchLocation)),
    mergeMapTo(
      from(
        getLocation().then(([lat, lon]) =>
          geocode(lat, lon).then(response => ({ ...response.data, lat, lon }))
        )
      ).pipe(
        map(({ location: { city_id, city_name }, lat, lon }) =>
          actions.fetchLocationSuccess(city_id, city_name, lat, lon)
        ),
        catchError(() => of(actions.fetchLocationError()))
      )
    )
  );

export const epics = combineEpics(fetchLocationEpic);
