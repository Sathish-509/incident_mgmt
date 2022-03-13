import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/redux/rootReducer';

export const updateFilterSelector = (state: RootState) => state.updateFilter;

export const updateFilterSelectorCriteria = createSelector(
    updateFilterSelector,
  (filter) => filter.UpdateFilterCriteria
);
