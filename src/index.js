import * as utils from './utils';

const entry = (...args) => {
  return utils.fetch(...args);
};

entry.pickup = (params = {}) =>
  entry({ ispickup: 1, order: 'hyoka', lim: 200, ...params });

entry.r18 = (params = {}) =>
  entry(params, { r18: true });

entry.noc = (params = {}) =>
  entry({ nocgenre: 1, ...params }, { r18: true });

entry.mnlt = (params = {}) =>
  entry({ nocgenre: 2, ...params }, { r18: true });

entry.bl = (params = {}) =>
  entry({ nocgenre: 3, ...params }, { r18: true });

entry.mid = (params = {}) =>
  entry({ nocgenre: 4, ...params }, { r18: true });

export default entry;
