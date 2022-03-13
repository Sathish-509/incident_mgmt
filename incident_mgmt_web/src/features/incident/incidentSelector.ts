import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/redux/rootReducer';

export const incidentSelector = (state: RootState) => state.incidents;

export const incidentsListSelector = createSelector(
    incidentSelector,
  (incident) => incident.incidentsResult
);
