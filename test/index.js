import assert from 'assert';

// target
import naroujs from '../src';
import * as utils from '../src/utils';

// specs
describe('naroujs', () => {
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

  describe('.rank()', () => {
    it('2013年5月1日ランキング集計開始直後のデータを取得するべき', async () => {
      const params = {
        rtype: '20130501-m',
      };
      const response = await naroujs.rank(params);
      assert(response.uri === utils.createUri(params, { api: 'rank' }));
      assert(response.items.length === 300);
      assert(response.items[0].ncode === 'N7648BN');
      assert(response.items[0].pt === 36092);
      assert(response.items[0].rank === 1);
    });
  });

  describe('.fame()', () => {
    it('2013年5月1日ランキング集計開始直後のn9669bkのデータを取得するべき', async () => {
      const params = {
        ncode: 'n9669bk',
      };
      const response = await naroujs.fame(params);
      assert(response.uri === utils.createUri(params, { api: 'fame' }));
      assert(response.items.length >= 1365);
      assert(response.items[0].pt === 623);
      assert(response.items[0].rank === 11);
      assert(response.items[0].rtype === '20130501-d');
    });
  });

  describe('.r18()', () => {
    it('ノクターン系の検索結果を正しく返すべき', async () => {
      const params = {
        xid: 'X8841n',
        nocgenre: [1],
        notnocgenre: [2, 3, 4],
      };
      const response = await naroujs.r18(params);
      assert(response.uri === utils.createUri(params, { api: 'novel18api' }));
      assert(response.allcount === 2);
      assert(response.items[0].title === 'エルフの国の宮廷魔導師になれたので、とりあえず姫様に性的な悪戯をしてみました。');
      assert(response.items[1].title === '姫騎士と呼ばないでっ！？');
    });
  });
});
