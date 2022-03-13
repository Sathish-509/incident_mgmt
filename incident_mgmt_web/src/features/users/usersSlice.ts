import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { User } from '../../app/types/user';
import { EnumLiteralsOf, ErrorPayload } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type usersResponse = {
  message: string;
  result: ResponseResult;
};

export type UserState = {
  usersResult?: User[];
  isFetching: boolean;
  error?: string;
};

const initialState: UserState = {
  isFetching: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUserStart: (state, action: Action) => {
      state.isFetching = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.usersResult = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure
} = users.actions;

export const usersReducer = users.reducer;

export { initialState as userInitialState };
