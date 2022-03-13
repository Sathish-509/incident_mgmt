import {
    handleNotOkResponse,
    getNetworkErrorOrOriginalError,
  } from 'common/utils/requestUtils';
  
  import { User } from '../../app/types/user';
  
  export async function fetchUser(): Promise<User[]> {
    try {
      const res = await fetch(`/users`, {
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
  