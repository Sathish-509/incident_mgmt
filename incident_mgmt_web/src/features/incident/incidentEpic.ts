import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';
// import { statementSearchCriteriaSelector } from '.././statementssearch/statementssearchSelector';
import {
    fetchIncidentsStart,
    fetchIncidentsSuccess,
    fetchIncidentsFailure,
} from './incidentSlice';
import { fetchIncidents } from './incidentRequest';
import { IncidentSearchCriteria } from 'app/types/incident';

export const initIncidentEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(fetchIncidentsStart.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(fetchIncidents(state.incidentsSearch?.incidentearchCriteria as IncidentSearchCriteria)).pipe(
        mergeMap((payload) => [fetchIncidentsSuccess(payload)]),
        catchError((error: Error) => [fetchIncidentsFailure({ error: error.message })])
        )
      )
  );
