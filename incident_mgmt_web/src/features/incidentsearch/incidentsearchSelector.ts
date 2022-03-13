import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/redux/rootReducer';

export const incidentsSearchSelector = (state: RootState) => state.incidentsSearch;

export const incidentsSearchCriteriaSelector = createSelector(
  incidentsSearchSelector,
  (incidentssearch) => incidentssearch.incidentearchCriteria
);
