import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { RootState } from 'app/redux/rootReducer';

import {
    initiateUpdateFilter,
    processUpdateFilter
} from './filtersearchSlice';

export const initUpdateFilterEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(initiateUpdateFilter.match),
    map((action) => processUpdateFilter(action.payload))
  );
