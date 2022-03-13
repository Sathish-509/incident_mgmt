# incident_mgmt

This project divided in to two microservices but wrapped for repo maintenance.
 - **FrotEnd:** 
```React, Reduc, Redux-Observable, Material- MUI components```
 - **Backend:**
```Node, Express, type-script-express-generator-template, @teammaestro/node-couchdb-client```
- **DB:**
CouchDB, which uses HTTP for communication

CouchDb, Schemas attached under couchdb_schemas of root directory
- **Steps To Run:**
``` Backend: incident_mgmt_service/packacge.json runs on port 3000
npm run dev

Frontend: incident_mgmt_service/packacge.json runs on port 3001
npm run start

Proxy enabled in package.json```
