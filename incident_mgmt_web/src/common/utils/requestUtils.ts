import { HttpError, NetworkError } from 'common/error';
import { TargetEnvItems, TARGET_ENV } from 'app/config';
import { Dictionary } from 'common/types';

export const createHeaders = () => {
  const productionHeaders = { 'Content-Type': 'application/json' };

  const devcloudHeaders = {
    ...productionHeaders,
    Authorization: `Bearer ${localStorage.getItem('Token')}`,
  };

  if (TARGET_ENV === TargetEnvItems.devcloud || process.env.NODE_ENV === 'test') {
    return devcloudHeaders;
  } else {
    return productionHeaders;
  }
};

export const createCredentials = () =>
  TARGET_ENV === TargetEnvItems.devcloud ? 'include' : 'same-origin';

// Fetch will throw TypeErrors with the message 'Network request failed'
// when there is a network issue (wrong url, no connectibity etc).
// We throw a custom type to differentiate from other TypeErrors when
// handling these errors in different parts of our app
export const getNetworkErrorOrOriginalError = (originalError: any) => {
  if (originalError.name === 'TypeError' && originalError.message === 'Network request failed') {
    return new NetworkError(originalError.message);
  } else {
    return originalError;
  }
};

export const handleNotOkResponse = (response: Response, customStatusCodeHandlers: any = {}) => {
  if (!response.ok) {
    const statusStr = response.status.toString();
    if (customStatusCodeHandlers[statusStr]) {
      return customStatusCodeHandlers[statusStr]();
    } else {
      throw new HttpError(response.status, response.statusText);
    }
  }
};

// Form encode the body params.
export const encodeBody = (params: Dictionary<string>) => {
  const pairs: string[] = [];

  const add = (key: string, value: string) => {
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  };

  Object.keys(params).forEach((item) => add(item, params[item]));

  return pairs.join('&');
};
