import { search, searchX } from '../src'

describe('search/searchX', () => {
  describe('正常系', () => {
    it('無職転生/理不尽な孫の手[288399]', async () => {
      const { items, ...meta } = await search({ lim: 1, userid: 288399, order: 'old', word: '無職転生' })
      expect(meta).toStrictEqual({
        uri: 'http://api.syosetu.com/novelapi/api/?out=json&lim=1&userid=288399&order=old&word=%E7%84%A1%E8%81%B7%E8%BB%A2%E7%94%9F',
        allcount: 8,
      })
      expect(items[0].title).toBe('王竜王討伐　- 最終章にして序章 -')
    })
    it('宮廷魔導師/磯貝武連[x8841n]', async () => {
      const { items, ...meta } = await searchX({ lim: 1, xid: 'x8841n', order: 'old', word: '宮廷魔導師' })
      expect(meta).toStrictEqual({
        uri: 'http://api.syosetu.com/novel18api/api/?out=json&lim=1&xid=x8841n&order=old&word=%E5%AE%AE%E5%BB%B7%E9%AD%94%E5%B0%8E%E5%B8%AB',
        allcount: 1,
      })
      expect(items[0].title).toBe('エルフの国の宮廷魔導師になれたので、とりあえず姫様に性的な悪戯をしてみました。')
    })
  })
})
