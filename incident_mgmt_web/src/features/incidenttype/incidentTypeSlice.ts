import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { IncidentType } from '../../app/types/incident';
import { EnumLiteralsOf, ErrorPayload } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type IncidentTypeResponse = {
  message: string;
  result: ResponseResult;
};

export type IncidentTypeState = {
  incidentTypesResult?: IncidentType[];
  isFetching: boolean;
  error?: string;
};

const initialState: IncidentTypeState = {
  isFetching: false,
};

export const incidentTypes = createSlice({
  name: 'incidentTypes',
  initialState,
  reducers: {
    fetchIncidentTypeStart: (state, action: Action) => {
      state.isFetching = true;
    },
    fetchIncidentTypeSuccess: (state, action: PayloadAction<IncidentType[]>) => {
      state.isFetching = false;
      state.incidentTypesResult = action.payload;
    },
    fetchIncidentTypesFailure: (state, action: PayloadAction<ErrorPayload>) => {
      state.isFetching = false;
      state.error = action.payload.error;
    },
  },
});

export const {
    fetchIncidentTypeStart,
    fetchIncidentTypeSuccess,
    fetchIncidentTypesFailure
} = incidentTypes.actions;

export const incidentTypesReducer = incidentTypes.reducer;

export { initialState as incidentTypesInitialState };
