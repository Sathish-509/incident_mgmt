import { Controller, Param, Body, Get, Post, Delete, HttpCode, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { IncidentDto } from '@/dtos/createincident.dto';
import IncidentService from '@services/incident.service';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreatedIncident, Incident } from '@/interfaces/incident.interface';
import { UpdateIncidentDto } from '@/dtos/updateincident.dto';

@Controller()
export class IncidentController {
  public incidentService = new IncidentService();

  @Post('/getincidents')
  @OpenAPI({ summary: 'Return a list of Incidents' })
  async getIncidents(@Body() incidentData: any) {
    const findAllUsersData: any[] = await this.incidentService.findAllIncidents(incidentData);
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Post('/incidents')
  @HttpCode(201)
  @UseBefore(validationMiddleware(IncidentDto, 'body'))
  @OpenAPI({ summary: 'Create a new incident' })
  async createIncident(@Body() incidentData: IncidentDto) {
    const createIncidentData: CreatedIncident = await this.incidentService.createIncident(incidentData);
    return { data: createIncidentData, message: 'created' };
  }

  @Post('/upsertincidents')
  @OpenAPI({ summary: 'Update incidents' })
  async updateIncident(@Body() incidentData: UpdateIncidentDto[]) {
    const updateIncidentData: any = await this.incidentService.updateIncident(incidentData);
    return { data: updateIncidentData, message: 'updated' };
  }

  @Delete('/incidents/:id/:revId')
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@Param('id') id: string, @Param('revId') revId: string) {
    const deleteIncidentData: any = await this.incidentService.deleteIncident(id, revId);
    return { data: deleteIncidentData, message: 'deleted' };
  }
}
