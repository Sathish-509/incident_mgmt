import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/redux/rootReducer';

export const incidentStatusSelector = (state: RootState) => state.incidentStatus;

export const incidentStatusListSelector = createSelector(
    incidentStatusSelector,
  (incidentStatus) => incidentStatus.incidentStatusResult
);
