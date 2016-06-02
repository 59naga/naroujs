import * as api from './api';
import querystring from 'querystring';

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
  const type = opts.api || 'novelapi';
  const { url, schema } = api[type];
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
  return `${url}?${querystring.stringify(data)}`;
}
