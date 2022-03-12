import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  AUTHORIZATION,
  DEFAULT_BOOKING_CENTER,
  X_APP_ID,
  X_CORRELATION_ID,
  X_TENANT_ID
} from '../common/headers';
import {getBookingCenterCodeFromDescription} from '../common/enums/bookingCenter';
import {generateGuid} from '../common/generateGuid';
import {IMPERSONATOR_QUERY} from '../common/queryParams';
import {deleteCookie, JSESSIONID_COOKIE} from '../common/cookie';
import {getErrorMessage} from '../common/getErrorMessage';

const defaultOptions = {
  baseURL: ''
};

const BASE_URL = '/api/v1';
const AUTHENTICATION_URL = '/api/token';
const EXPIRY_TIME = 3600;

const api = axios.create(defaultOptions);

const getTimeDifferenceInSeconds = (expiryDate) => {
  return expiryDate - (Date.now() / 1000);
}

const getAuthenticationToken = async (runAs) => {
  const fetchToken = async (params) => {
    const authResponse = await api.get(AUTHENTICATION_URL, {params});
    return authResponse.data;
  };

  const localAuthToken = localStorage.getItem(AUTHORIZATION);
  let runAsValueInToken = null;
  let decodedToken;
  if (localAuthToken) {
    try {
      decodedToken = jwt_decode(localAuthToken);
      runAsValueInToken = decodedToken?.runAs && decodedToken?.sub;
    } catch (err) {
      console.error(err)
    }
    if (decodedToken?.exp && getTimeDifferenceInSeconds(decodedToken.exp) > EXPIRY_TIME && (decodedToken.sub === runAs || runAs === null)) {
      return localAuthToken;
    }
  }
  const authenticationResponse = await fetchToken({runAs: runAs || runAsValueInToken});
  localStorage.setItem(AUTHORIZATION, authenticationResponse);
  return authenticationResponse;
};

api.interceptors.request.use(async (config) => {
  deleteCookie(JSESSIONID_COOKIE);

  const queryParams = new URLSearchParams(window.location.search);
  const runAs = queryParams.get(IMPERSONATOR_QUERY);

  if (config.url === AUTHENTICATION_URL) {
    if (runAs) {
      config.params = {...config.params, runAs};
    }
  } else {
    const authToken = await getAuthenticationToken(runAs);
    config.headers[AUTHORIZATION] = `Bearer ${authToken}`;
  }
  config.headers[X_CORRELATION_ID] = generateGuid();
  const tenantDescFromStorage = sessionStorage.getItem(X_TENANT_ID);
  const tenantId = config.headers[X_TENANT_ID] || getBookingCenterCodeFromDescription(tenantDescFromStorage);
  config.headers[X_TENANT_ID] = tenantId || DEFAULT_BOOKING_CENTER;

  // eslint-disable-next-line no-undef
  const appId = process.env.REACT_APP_CLIPP_APP_ID;
  if (appId) {
    config.headers[X_APP_ID] = appId;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    console.error('Error ', getErrorMessage(err))
    throw err;
  }
);

export {BASE_URL, AUTHENTICATION_URL, api};
