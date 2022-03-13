import { IsString } from 'class-validator';

export class IncidentDto {

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public status: string;

  @IsString()
  public incidentType: string;

  @IsString()
  public createdBy: string;

  @IsString()
  public lastModifiedBy: string;

  @IsString()
  public assignedTo: string;

  @IsString()
  public createdDate: string;

  @IsString()
  public modifiedDate: string;
}
