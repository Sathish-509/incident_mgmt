import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';

import {
    initiateIncidentSearch,
    processIncidentsSearch,
} from './incidentsearchSlice';

export const initIncidentSearchEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(initiateIncidentSearch.match),
    map((action) => processIncidentsSearch(action.payload))
  );
