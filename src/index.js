/* eslint-disable prefer-const,import/no-mutable-exports */
import fetch from './fetch';

let naroujs;

naroujs = (...args) =>
  fetch(...args);

naroujs.pickup = (params = {}) =>
  naroujs({ ispickup: 1, order: 'hyoka', lim: 200, ...params });

naroujs.r18 = (params = {}) =>
  naroujs(params, { api: 'novel18api' });

naroujs.noc = (params = {}) =>
  naroujs({ nocgenre: 1, ...params }, { api: 'novel18api' });

naroujs.mnlt = (params = {}) =>
  naroujs({ nocgenre: 2, ...params }, { api: 'novel18api' });

naroujs.bl = (params = {}) =>
  naroujs({ nocgenre: 3, ...params }, { api: 'novel18api' });

naroujs.mid = (params = {}) =>
  naroujs({ nocgenre: 4, ...params }, { api: 'novel18api' });

naroujs.rank = (params = {}) =>
  naroujs(params, { api: 'rank' });

naroujs.fame = (params = {}) =>
  naroujs(params, { api: 'fame' });

export default naroujs;
