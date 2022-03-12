import { CouchDb } from '@teammaestro/node-couchdb-client';
import { CouchDbConfig, incidentUsersDbName } from '@/config/couchDbconfig';

const couchDb = new CouchDb(CouchDbConfig)

class UserService {

  public async findAllUser(): Promise<any> {
    const users = await couchDb.findDocuments({
      dbName: incidentUsersDbName,
      findOptions: {
          selector: {
          },
          fields: ['_id', '_rev', 'name', 'role'],
      }
    });
    return users;
  }

}

export default UserService;
