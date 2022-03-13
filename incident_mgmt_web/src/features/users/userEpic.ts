import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';

import { RootState } from 'app/redux/rootReducer';
import {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure,
} from './usersSlice';
import { fetchUser } from './userRequest';

export const initUsersEpic: Epic<AnyAction, AnyAction, RootState> = (action$, state$) =>
  action$.pipe(
    filter(fetchUserStart.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      from(fetchUser()).pipe(
        mergeMap((payload) => [fetchUserSuccess(payload)]),
        catchError((error: Error) => [fetchUserFailure({ error: error.message })])
        )
      )
  );
