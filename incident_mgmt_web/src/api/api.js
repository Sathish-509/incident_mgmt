import {X_TENANT_ID} from '../common/headers';
import {api, AUTHENTICATION_URL, BASE_URL} from './baseApi';

const authentication = {
  getToken: (params) => api.get(AUTHENTICATION_URL, {params}),
}

const features = {
  get: () => api.get(`${BASE_URL}/features`),
};

export default {
  authentication,
  features
}
