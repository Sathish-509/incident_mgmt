export interface IncidentSearchCriteria {
    createdBy?: string;
    assignedTo?: string;
    lastModifiedBy?: string;
    incidentType?: string;
    status?: string;
    sort?: any,
}

export interface Order {
    orderByColumn: string;
    orderBy: 'asc' | 'desc';
}

export interface Page {
    pageSize: number;
    pageNumber: number;
}

export interface Incidents {
    _id: any;
    _rev: any;
    title: any;
    description: any;
    createdBy: any;
    assignedTo: any;
    incidentType: any;
    status: any;
    createdDate: any;
    modifiedDate: any;
}

export interface IncidentType {
    _id: string;
    _rev: string;
    name: string;
}

export interface IncidentStatus {
    _id: string;
    _rev: string;
    status: string;
}
