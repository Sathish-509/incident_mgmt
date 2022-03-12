import { IsString } from 'class-validator';

export class UpdateIncidentDto {

  @IsString()
  public _id: string;

  @IsString()
  public _rev: string;

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
}
