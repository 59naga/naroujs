import schema from './api/schema';
import querystring from 'querystring';
import { gunzip } from 'zlib';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';

const apis = {
  default: 'http://api.syosetu.com/novelapi/api/',
  r18: 'http://api.syosetu.com/novel18api/api/',
};

export function stringifyValues(object = {}) {
  const stringifidObject = {};

  Object.keys(object).forEach(key => {
    const value = object[key];

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        stringifidObject[key] = String(value);
        break;

      case '[object Array]':
        stringifidObject[key] = value.join('-');
        break;

      default:
        stringifidObject[key] = value;
    }
  });

  return stringifidObject;
}

export function normalizeNovelType(items) {
  items.forEach(item => {
    if (item.noveltype !== undefined) {
      item.novel_type = item.noveltype;
      delete item.noveltype;
    }
  });
}

export function createUri(params, opts = {}) {
  const api = opts.r18 ? apis.r18 : apis.default;
  const { error, value } = schema.validate(stringifyValues(params));
  if (error) {
    throw error;
  }
  const data = { ...value };
  if (opts.jsonp) {
    data.out = 'jsonp';
  } else {
    data.out = 'json';
    data.gzip = 5;
  }
  return `${api}?${querystring.stringify(data)}`;
}

export function fetchNodeJs(uri) {
  const options = {
    responseType: 'arraybuffer',
  };
  return axios.get(uri, options)
  .then(response => response.data)
  .then(data => new Promise((resolve, reject) => {
    gunzip(data, (error, buffer) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(buffer);
    });
  }))
  .then(buffer => JSON.parse(buffer.toString()));
}
export function fetchBrowser(uri) {
  return fetchJsonp(uri)
  .then(response => response.json());
}

export function fetch(params = {}, opts = {}) {
  let uri;
  let promise;
  if (typeof window === 'undefined') {
    uri = createUri(params, opts);
    promise = fetchNodeJs(uri);
  } else {
    uri = createUri(params, { ...opts, jsonp: true });
    promise = fetchBrowser(uri);
  }

  return promise
  .then(([result, ...items]) => {
    normalizeNovelType(items);

    return { uri, allcount: result.allcount, items };
  });
}
