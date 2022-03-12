import { CouchDb } from '@teammaestro/node-couchdb-client';
import { CouchDbConfig, incidentTypesDbName } from '@/config/couchDbconfig';

const couchDb = new CouchDb(CouchDbConfig)

class IncidentTypeService {

  public async findAllIncidentTypes(): Promise<any> {
    const incidentTypes = await couchDb.findDocuments({
      dbName: incidentTypesDbName,
      findOptions: {
          selector: {
          },
      }
    });
    return incidentTypes;
  }

}

export default IncidentTypeService;
