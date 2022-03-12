import { CouchDb } from '@teammaestro/node-couchdb-client';
import { CouchDbConfig, incidentStatusDbName } from '@/config/couchDbconfig';

const couchDb = new CouchDb(CouchDbConfig)

class IncidentStatusService {

  public async findAllIncidentStatus(): Promise<any> {
    const incidentStatus = await couchDb.findDocuments({
      dbName: incidentStatusDbName,
      findOptions: {
          selector: {
          },
      }
    });
    return incidentStatus;
  }

}

export default IncidentStatusService;
