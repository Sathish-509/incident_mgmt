import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import IncidentStatusService from '@/services/incidentstatus.service';

@Controller()
export class IncidentStatusController {
  public incidentStatusService = new IncidentStatusService();

  @Get('/incident_status')
  @OpenAPI({ summary: 'Return a list of incident status' })
  async getIncidentStatus() {
    const findAllIncidentStatusData: any = await this.incidentStatusService.findAllIncidentStatus();
    return { data: findAllIncidentStatusData, message: 'findAll' };
  }
  
}
