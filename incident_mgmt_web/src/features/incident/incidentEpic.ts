import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { RootState } from 'app/redux/rootReducer';
import {
    fetchIncidentsStart,
    fetchIncidentsSuccess,
    fetchIncidentsFailure,
    addIncidentStart,
    addIncidentSuccess,
    addIncidentFailure
} from './incidentSlice';
import { addIncident, fetchIncidents } from './incidentRequest';
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

export const addIncidentEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(addIncidentStart.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(addIncident(state.incidentsSearch?.incidentearchCriteria as IncidentSearchCriteria)).pipe(
        mergeMap((payload) => []),
        catchError((error: Error) => [fetchIncidentsFailure({ error: error.message })])
        )
      )
  );