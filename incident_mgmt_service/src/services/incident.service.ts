import { HttpException } from '@exceptions/HttpException';
import { CreatedIncident } from '@interfaces/incident.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { IncidentDto } from '@/dtos/createincident.dto';
import { CouchDb } from '@teammaestro/node-couchdb-client';
import { CouchDbConfig, incidentDbName } from '@/config/couchDbconfig';

const couchDb = new CouchDb(CouchDbConfig)

class IncidentService {
  public users = userModel;

  public async findAllIncidents(): Promise<any> {
    const incidentrecord = await couchDb.findDocuments({
        dbName: incidentDbName,
        findOptions: {
            selector: {
                incidentType: 'incident1',
                createdBy: '232'
            }
        }
    });
    return incidentrecord;
  }

  public async createIncident(incidentData: IncidentDto): Promise<CreatedIncident> {
    if (isEmpty(incidentData)) throw new HttpException(400, "Not having incidentData");
    const incidentRecords: CreatedIncident = await couchDb.createDocument({
        dbName: incidentDbName,
        doc: incidentData
    }) as CreatedIncident;
    if(incidentRecords.ok) {
        return incidentRecords;
    } else {
        throw new HttpException(500, `Exception in creating incident`);
    }
  }

  public async updateIncident(userData: any[]): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const updateIncidents = await couchDb.upsertDocuments({
        dbName: incidentDbName,
        docs: userData
    })
    return updateIncidents;
  }

  public async deleteIncident(id: string, revId: string): Promise<any> {
    const deleteDocument = couchDb.deleteDocument({
        dbName: incidentDbName,
        docId: id,
        rev: revId
    })
    return deleteDocument;
  }
}

export default IncidentService;
