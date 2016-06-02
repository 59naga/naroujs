/* eslint-disable prefer-const,import/no-mutable-exports */
import fetch from './fetch';

let naroujs;

naroujs = (...args) =>
  fetch(...args);

naroujs.pickup = (params = {}) =>
  naroujs({ ispickup: 1, order: 'hyoka', lim: 200, ...params });

naroujs.r18 = (params = {}) =>
  naroujs(params, { r18: true });

naroujs.noc = (params = {}) =>
  naroujs({ nocgenre: 1, ...params }, { r18: true });

naroujs.mnlt = (params = {}) =>
  naroujs({ nocgenre: 2, ...params }, { r18: true });

naroujs.bl = (params = {}) =>
  naroujs({ nocgenre: 3, ...params }, { r18: true });

naroujs.mid = (params = {}) =>
  naroujs({ nocgenre: 4, ...params }, { r18: true });

export default naroujs;
