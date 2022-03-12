export const CouchDbConfig = {
    host: 'http://localhost',
    port: 5984,
    auth: {
        username: 'admin',
        password: 'admin'
    },
    logging: true,
    defaultDatabase: 'incident'
};

export const incidentDbName = "incident_mgmt";
export const incidentUsersDbName = "users";
export const incidentTypesDbName = "incident_types";
export const incidentStatusDbName = "incident_status";