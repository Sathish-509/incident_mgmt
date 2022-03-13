import { combineEpics } from 'redux-observable';
import * as incidentEpic from 'features/incident/incidentEpic';
import * as  incidentsearchEpic from 'features/incidentsearch/incidentsearchEpic';
import * as incidentStatusEpic from 'features/incidentstatus/incidentStatusEpic';
import * as  incidentTypeEpic from 'features/incidenttype/incidentTypeEpic';
import * as  usersEpic from 'features/users/userEpic';

const rootEpic = combineEpics(
...Object.values(incidentEpic),
...Object.values(incidentsearchEpic),
...Object.values(incidentStatusEpic),
...Object.values(incidentTypeEpic),
...Object.values(usersEpic),
);

export { rootEpic };
