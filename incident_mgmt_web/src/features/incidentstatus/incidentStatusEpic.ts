import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';
import {
    fetchIncidentStatusStart,
    fetchIncidentStatusSuccess,
    fetchIncidentStatusFailure,
} from './incidentStatusSlice';
import { fetchIncidentStatus } from './incidentStatusRequest';

export const initIncidentStatusEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(fetchIncidentStatusStart.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(fetchIncidentStatus()).pipe(
        mergeMap((payload) => [fetchIncidentStatusSuccess(payload)]),
        catchError((error: Error) => [fetchIncidentStatusFailure({ error: error.message })])
        )
      )
  );
