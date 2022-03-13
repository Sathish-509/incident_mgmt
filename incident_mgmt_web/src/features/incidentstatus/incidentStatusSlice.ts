import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { IncidentStatus } from '../../app/types/incident';
import { EnumLiteralsOf, ErrorPayload } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type IncidentStatusResponse = {
  message: string;
  result: ResponseResult;
};

export type IncidentStatusState = {
  incidentStatusResult?: IncidentStatus[];
  isFetching: boolean;
  error?: string;
};

const initialState: IncidentStatusState = {
  isFetching: false,
};

export const incidentStatus = createSlice({
  name: 'incidentstatus',
  initialState,
  reducers: {
    fetchIncidentStatusStart: (state, action: Action) => {
      state.isFetching = true;
    },
    fetchIncidentStatusSuccess: (state, action: PayloadAction<IncidentStatus[]>) => {
      state.isFetching = false;
      state.incidentStatusResult = action.payload;
    },
    fetchIncidentStatusFailure: (state, action: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
    fetchIncidentStatusStart,
    fetchIncidentStatusSuccess,
    fetchIncidentStatusFailure
} = incidentStatus.actions;

export const incidentStatusReducer = incidentStatus.reducer;

export { initialState as incidentStatusInitialState };
