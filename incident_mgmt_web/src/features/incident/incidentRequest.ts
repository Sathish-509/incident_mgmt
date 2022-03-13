import {
    handleNotOkResponse,
    getNetworkErrorOrOriginalError,
  } from 'common/utils/requestUtils';
  
  import { Incidents, IncidentSearchCriteria } from '../../app/types/incident';
  
  export async function fetchIncidents(incidentSearch: IncidentSearchCriteria): Promise<Incidents[]> {
    try {
      const res = await fetch(`/getincidents`, {
        method: 'POST',
        body: JSON.stringify(incidentSearch)
      });
      handleNotOkResponse(res);
      const json = (await res.json());
      return json.data.docs;
    } catch (error) {
      console.log("error", error);
      throw getNetworkErrorOrOriginalError(error);
    }
  }
  