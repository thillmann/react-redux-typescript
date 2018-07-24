import { Epic } from 'redux-observable';
import { delay, filter, mapTo, take } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { IRootState } from '../store';
import * as actions from './project.actions';
import { ProjectAction } from './project.reducer';

export const changeProjectEpic: Epic<
  ProjectAction,
  ProjectAction,
  IRootState
> = (action$, store) =>
  action$.pipe(
    filter(isActionOf(actions.addProject)),
    take(1),
    delay(2000),
    mapTo(actions.addProject({ id: '12312', name: 'test' }))
  );
