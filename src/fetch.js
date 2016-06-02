import * as utils from './utils';
import { gunzip } from 'zlib';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import { promisify } from 'bluebird';

const gunzipAsync = promisify(gunzip);

export function fetchNodeJs(uri) {
  const options = {
    responseType: 'arraybuffer',
  };
  return Promise.resolve()
  .then(() => axios.get(uri, options))
  .then(response => response.data)
  .then(data => gunzipAsync(data))
  .then(buffer => JSON.parse(buffer.toString()));
}
export function fetchBrowser(uri) {
  return Promise.resolve()
  .then(() => fetchJsonp(uri))
  .then(response => response.json());
}

export default (params = {}, opts = {}) => {
  let uri;
  let promise;
  try {
    if (typeof window === 'undefined') {
      uri = utils.createUri(params, opts);
      promise = fetchNodeJs(uri);
    } else {
      uri = utils.createUri(params, { ...opts, jsonp: true });
      promise = fetchBrowser(uri);
    }
  } catch (error) {
    return Promise.reject(error);
  }

  return promise
  .then(([result, ...items]) => {
    utils.normalizeNovelType(items);

    return { uri, allcount: result.allcount, items };
  });
};
