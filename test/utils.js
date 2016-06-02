import assert from 'assert';
import { throws } from 'assert-exception';

// target
import * as utils from '../src/utils';

// specs
describe('utils', () => {
  describe('.createUri()', () => {
    it('存在しないパラメーターを指定した場合、エラーを投げるべき', () => {
      assert(throws(() => {
        utils.createUri({ invalid: 1 });
      }).message === '"invalid" is not allowed');
    });

    it('未定義の値を指定した場合、エラーを投げるべき', () => {
      assert(throws(() => {
        utils.createUri({ order: 'invalid' });
      }).message.match(/^child "order" fails because \["order"/));
    });

    it('デフォルトでgzipped-jsonを設定するべき', () => {
      const params = {};
      const [, querystring] = utils.createUri(params).split('?');
      assert(querystring === 'out=json&gzip=5');
    });

    it('jsonpに切り替えれるべき', () => {
      const params = {};
      const [, querystring] = utils.createUri(params, { jsonp: true }).split('?');
      assert(querystring === 'out=jsonp');
    });

    it('数値型の値を文字型に変換すべき', () => {
      const params = {
        biggenre: 1,
      };
      const [, querystring] = utils.createUri(params).split('?');
      assert(querystring === 'biggenre=1&out=json&gzip=5');
    });

    it('配列をハイフンで連結すべき', () => {
      const params = {
        ncode: ['n9669bk', 'N5705CH'],
        lastup: ['', '1464661747'],
      };
      const [, querystring] = utils.createUri(params).split('?');
      assert(querystring === 'ncode=n9669bk-N5705CH&lastup=-1464661747&out=json&gzip=5');
    });

    it('大文字小文字を無視すべき', () => {
      const params = {
        order: 'HYOKA',
        ncode: ['n9669bk', 'N5705CH'],
        type: 'rE',
      };
      const [, querystring] = utils.createUri(params).split('?');
      assert(querystring === 'order=hyoka&ncode=n9669bk-N5705CH&type=re&out=json&gzip=5');
    });
  });
});
