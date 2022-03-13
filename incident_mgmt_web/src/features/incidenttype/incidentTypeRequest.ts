import {
    handleNotOkResponse,
    getNetworkErrorOrOriginalError,
  } from 'common/utils/requestUtils';
  
  import { IncidentType } from '../../app/types/incident';
  
  export async function fetchIncidentType(): Promise<IncidentType[]> {
    try {
      const res = await fetch(`/incident_types`, {
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
  