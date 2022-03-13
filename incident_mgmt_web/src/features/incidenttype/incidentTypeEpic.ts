import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';
// import { statementSearchCriteriaSelector } from '.././statementssearch/statementssearchSelector';
import {
    fetchIncidentTypeStart,
    fetchIncidentTypeSuccess,
    fetchIncidentTypesFailure,
} from './incidentTypeSlice';
import { fetchIncidentType } from './incidentTypeRequest';

export const initIncidentTypeEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(fetchIncidentTypeStart.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(fetchIncidentType()).pipe(
        mergeMap((payload) => [fetchIncidentTypeSuccess(payload)]),
        catchError((error: Error) => [fetchIncidentTypesFailure({ error: error.message })])
        )
      )
  );
