export interface CreatedIncident {
    ok: boolean;
    id: string;
    rev: string;
  }

export interface Incident {
    id: string;
    rev: string;
    title: string;
    description: string;
    status: string;
    incidentType: string;
    createdBy: string;
    lastModifiedBy?: string;
    assignedTo?: string;
}
