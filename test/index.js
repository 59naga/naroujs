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
