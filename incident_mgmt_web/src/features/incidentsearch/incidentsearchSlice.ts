import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Incidents, IncidentSearchCriteria } from '../../app/types/incident';
import { EnumLiteralsOf } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type IncidentSearchResponse = {
  message: string;
  result: ResponseResult;
};

export type IncidentSearchState = {
  incidentearchCriteria?: IncidentSearchCriteria;
  incidentRecord?: Incidents;
  isFetching: boolean;
  error?: string;
};

const initialState: IncidentSearchState = {
  isFetching: false,
};

export const IncidentSearch = createSlice({
  name: 'incidentsearch',
  initialState,
  reducers: {
    initiateIncidentSearch: (state, action: PayloadAction<IncidentSearchCriteria>) => {
      state.isFetching = true;
    },
    processIncidentsSearch: (state, action: PayloadAction<IncidentSearchCriteria>) => {
      state.isFetching = false;
      state.incidentearchCriteria = action.payload;
    },
    addIncidentRecordStart: (state, action: PayloadAction<Incidents>) => {
      state.isFetching = true;
    },
    storeUpdateAddRecord: (state, action: PayloadAction<Incidents>) => {
      state.isFetching = false;
      state.incidentearchCriteria = action.payload;
    }
  },
});

export const {
    initiateIncidentSearch,
    processIncidentsSearch,
    addIncidentRecordStart,
    storeUpdateAddRecord
} = IncidentSearch.actions;

export const incidentSearchReducer = IncidentSearch.reducer;

export { initialState as incidentSearchInitialState };
