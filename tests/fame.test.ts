import { fame } from '../src'

describe('fame', () => {
  describe('正常系', () => {
    it('n9669bkの過去のランキング', async () => {
      const { items, ...meta } = await fame({ ncode: 'n9669bk' })
      expect(meta).toStrictEqual({
        uri: 'http://api.syosetu.com/rank/rankin/?out=json&ncode=n9669bk',
      })
      expect(items[0]).toStrictEqual({ pt: 623, rank: 11, rtype: '20130501-d' })
    })
  })
})
