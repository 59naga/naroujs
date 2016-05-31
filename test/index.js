// dependencies
import 'babel-polyfill';
import assert from 'assert';
import { throws } from 'assert-exception';

// target
import naroujs from '../src';
import * as utils from '../src/utils';

// specs
describe('naroujs', () => {
  describe('utils.createUri', () => {
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

  describe('naroujs()', () => {
    it('複雑なパラメーター指定でも、結果を正しく返すべき', async () => {
      const params = {
        of: 't',
        order: 'HYOKA',
        word: '転生',
        biggenre: 2,
        genre: 201,
        userid: '288399-509642',
        length: '999-',
        ncode: ['n9669bk', 'N5705CH'],
        type: 'rE',
        buntai: '4-6',
        stop: 1,
        ispickup: 0,
        lastup: ['', '1464661747'],
      };
      const response = await naroujs(params);
      assert(response.uri === utils.createUri(params));
      assert(response.allcount === 2);
      assert(response.items[0].title === '無職転生　- 異世界行ったら本気だす -');
      assert(response.items[1].title === 'エルフ転生からのチート建国記');
    });
  });

  describe('naroujs.r18()', () => {
    it('ノクターン系の検索結果を正しく返すべき', async () => {
      const params = {
        xid: 'X8841n',
        nocgenre: [1],
        notnocgenre: [2, 3, 4],
      };
      const response = await naroujs.r18(params);
      assert(response.uri === utils.createUri(params, { r18: true }));
      assert(response.allcount === 2);
      assert(response.items[0].title === 'エルフの国の宮廷魔導師になれたので、とりあえず姫様に性的な悪戯をしてみました。');
      assert(response.items[1].title === '姫騎士と呼ばないでっ！？');
    });
  });
});
