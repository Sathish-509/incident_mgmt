import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { Incidents } from '../../app/types/incident';
import { EnumLiteralsOf, ErrorPayload } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type IncidentResponse = {
  message: string;
  result: ResponseResult;
};

export type IncidentState = {
  incidentsResult?: Incidents[];
  isFetching: boolean;
  error?: string;
};

const initialState: IncidentState = {
  isFetching: false,
};

export const incidents = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    fetchIncidentsStart: (state, action: Action) => {
      state.isFetching = true;
    },
    fetchIncidentsSuccess: (state, action: PayloadAction<Incidents[]>) => {
      state.isFetching = false;
      state.incidentsResult = action.payload;
    },
    fetchIncidentsFailure: (state, action: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
    fetchIncidentsStart,
    fetchIncidentsSuccess,
    fetchIncidentsFailure
} = incidents.actions;

export const incidentsReducer = incidents.reducer;

export { initialState as incidentsInitialState };
