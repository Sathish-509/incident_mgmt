import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/redux/rootReducer';

export const incidentTypeSelector = (state: RootState) => state.incidentsType;

export const incidentTypesListSelector = createSelector(
    incidentTypeSelector,
  (incidentType) => incidentType.incidentTypesResult
);
