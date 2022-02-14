import { pickup } from '../src'

describe.only('pickup', () => {
  describe('正常系', () => {
    it('', async () => {
      const { items, ...meta } = await pickup()
      expect(meta).toStrictEqual({
        uri: 'http://api.syosetu.com/novelapi/api/?out=json&ispickup=1&order=hyoka&lim=200',
        allcount: 1000,
      })
      // FIXME: 日によって内容変わるのでテスト内容もうちょっとなんとかする
      expect(items[0].title).toBe('追放悪役令嬢の旦那様【WEB版】')
    })
  })
})
