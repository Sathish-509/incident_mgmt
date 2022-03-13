import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';

import {
  addIncidentRecordStart,
    initiateIncidentSearch,
    processIncidentsSearch,
    storeUpdateAddRecord,
} from './incidentsearchSlice';

export const initIncidentSearchEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(initiateIncidentSearch.match),
    map((action) => processIncidentsSearch(action.payload))
  );

  export const incidentRecordEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(addIncidentRecordStart.match),
    map((action) => storeUpdateAddRecord(action.payload))
  );