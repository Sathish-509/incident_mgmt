import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import { IncidentController } from './controllers/incident.controller';
import { IncidentStatusController } from './controllers/incidentstatus.controller';
import { IncidentTypeController } from './controllers/incidenttype.controller';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, 
    IncidentController, IncidentTypeController, IncidentStatusController]);
app.listen();
