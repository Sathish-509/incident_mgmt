import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/redux/rootReducer';

export const usersSelector = (state: RootState) => state.users;

export const usersListSelector = createSelector(
    usersSelector,
  (users) => users.usersResult
);
