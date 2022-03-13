import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateFilter } from '../../app/types/incident';
import { EnumLiteralsOf } from 'common/types';

export type ResponseResult = EnumLiteralsOf<typeof ResponseResults>;

export const ResponseResults = Object.freeze({
  // we need to explicitly cast values to get the proper literal type
  SUCCESS: 'SUCCESS' as 'SUCCESS',
  FAILED: 'FAILED' as 'FAILED',
});

export type UpdateFilterResponse = {
  message: string;
  result: ResponseResult;
};

export type UpdateFilterState = {
  UpdateFilterCriteria?: UpdateFilter;
  isFetching: boolean;
  error?: string;
};

const initialState: UpdateFilterState = {
  isFetching: false,
};

export const updateFilter = createSlice({
  name: 'updateFilter',
  initialState,
  reducers: {
    initiateUpdateFilter: (state, action: PayloadAction<UpdateFilter>) => {
      state.isFetching = true;
    },
    processUpdateFilter: (state, action: PayloadAction<UpdateFilter>) => {
      state.isFetching = false;
      state.UpdateFilterCriteria = action.payload;
    }
  },
});

export const {
    initiateUpdateFilter,
    processUpdateFilter,
} = updateFilter.actions;

export const updateFilterReducer = updateFilter.reducer;

export { initialState as updateFilterInitialState };
