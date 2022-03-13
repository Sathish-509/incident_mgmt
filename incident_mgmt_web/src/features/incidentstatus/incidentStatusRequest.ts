import {
    handleNotOkResponse,
    getNetworkErrorOrOriginalError,
  } from 'common/utils/requestUtils';
  
  import { IncidentStatus } from '../../app/types/incident';
  
  export async function fetchIncidentStatus(): Promise<IncidentStatus[]> {
    try {
      const res = await fetch(`/incident_status`, {
        method: 'GET',
      });
      handleNotOkResponse(res);
      const json = (await res.json());
      return json.data.docs;
    } catch (error) {
      console.log("error", error);
      throw getNetworkErrorOrOriginalError(error);
    }
  }
  