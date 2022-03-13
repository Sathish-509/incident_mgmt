import { AnyAction, combineReducers, createAction } from '@reduxjs/toolkit';
import { incidentsInitialState, incidentsReducer } from 'features/incident/incidentSlice';
import { incidentSearchInitialState, incidentSearchReducer } from 'features/incidentsearch/incidentsearchSlice';
import { incidentStatusInitialState, incidentStatusReducer } from 'features/incidentstatus/incidentStatusSlice';
import { incidentTypesInitialState, incidentTypesReducer } from 'features/incidenttype/incidentTypeSlice';
import { userInitialState, usersReducer } from 'features/users/usersSlice';
import { updateFilterInitialState, updateFilterReducer } from 'features/filter/filtersearchSlice';

export type RootState = ReturnType<typeof appReducer>;

export const appReducer = combineReducers({
  incidents: incidentsReducer,
  incidentsSearch: incidentSearchReducer,
  incidentStatus: incidentStatusReducer,
  incidentsType: incidentTypesReducer,
  users: usersReducer,
  updateFilter: updateFilterReducer
});

export const resetApp = createAction('root/resetApp');

export const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (resetApp.match(action)) {
    // This will force all the slices in appReducer to use their default slice state
    state = rootInitialState;
  }

  return appReducer(state, action);
};

export const rootInitialState = {
  incidents: incidentsInitialState,
  incidentsSearch: incidentSearchInitialState,
  incidentStatus: incidentStatusInitialState,
  incidentsType: incidentTypesInitialState,
  users: userInitialState,
  updateFilter: updateFilterInitialState

};
