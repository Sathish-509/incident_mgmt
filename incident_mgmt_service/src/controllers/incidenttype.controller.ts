import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import IncidentTypeService from '@/services/incidenttype.service';

@Controller()
export class IncidentTypeController {
  public incidentTypeService = new IncidentTypeService();

  @Get('/incident_types')
  @OpenAPI({ summary: 'Return a list of incident types' })
  async getIncidentTypes() {
    const findAllIncidentTypesData: any = await this.incidentTypeService.findAllIncidentTypes();
    return { data: findAllIncidentTypesData, message: 'findAll' };
  }
  
}
