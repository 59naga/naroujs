import { rank } from '../src'

describe('rank', () => {
  describe('正常系', () => {
    it('2013年5月1日の月間ランキング', async () => {
      const { items, ...meta } = await rank({ rtype: '20130501-m' })
      expect(meta).toStrictEqual({
        uri: 'http://api.syosetu.com/rank/rankget/?out=json&rtype=20130501-m',
      })
      expect(items[0]).toStrictEqual({ ncode: 'N7648BN', pt: 36092, rank: 1 })
    })
  })
})
