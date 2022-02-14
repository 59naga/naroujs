import { fetchToc } from '../src'

describe('fetchToc', () => {
  describe('正常系', () => {
    it('無職転生', async () => {
      const { chapters, episodes, ...meta } = await fetchToc('n9669bk')

      const titles = chapters.map((chapter) => [
        chapter.title,
        chapter.episodes.map((episode) => [episode.subtitle, episode.updated?.toLocaleDateString()].join(' ')),
      ])
      expect(chapters.length).toBe(25)
      expect(episodes.length).toBe(0)
      expect(titles[0]).toStrictEqual([
        '第１章　幼年期',
        [
          'プロローグ 2013/11/27',
          '第一話「もしかして：異世界」 2012/11/29',
          '第二話「ドン引きのメイドさん」 2013/1/25',
          '第三話「魔術教本」 2013/11/9',
          '第四話「師匠」 2019/8/31',
          '第五話「剣術と魔術」 2014/10/29',
          '第六話「尊敬の理由」 2013/1/7',
          '第七話「友達」 2013/1/26',
          '第八話「鈍感」 2019/7/25',
          '第九話「緊急家族会議」 2019/3/12',
          '第十話「伸び悩み」 2019/3/25',
          '第十一話「離別」 2012/12/3',
        ],
      ])

      expect(meta).toStrictEqual({
        uri: 'http://ncode.syosetu.com/n9669bk',
        author: '理不尽な孫の手',
        authorId: '288399',
        title: '無職転生　- 異世界行ったら本気だす -',
        content:
          '３４歳職歴無し住所不定無職童貞のニートは、ある日家を追い出され、人生を後悔している間にトラックに轢かれて死んでしまう。目覚めた時、彼は赤ん坊になっていた。どうやら異世界に転生したらしい。<br>\n' +
          '　彼は誓う、今度こそ本気だして後悔しない人生を送ると。<br>\n' +
          '<br>\n' +
          '【2015年4月3日23:00　完結しました】<br>\n' +
          '<br>\n' +
          '<br>\n' +
          '<br>\n' +
          '　完結後の番外編はこちらで連載中です。<br>\n' +
          '　無職転生 - 蛇足編 -<br>\n' +
          'http://ncode.syosetu.com/n4251cr/',
        count: 286,
      })
    })
    it('R18エルフの国のry', async () => {
      const { chapters, episodes, ...meta } = await fetchToc('n7663ct', { r18: true })

      const titles = episodes.map((episode) => [episode.subtitle, episode.updated?.toLocaleDateString()].join(' '))
      expect(chapters.length).toBe(0)
      expect(episodes.length).toBe(685)
      expect(titles[0]).toBe('詐欺師からの大出世 2016/1/25')

      expect(meta).toStrictEqual({
        uri: 'http://novel18.syosetu.com/n7663ct',
        author: '磯貝武連',
        authorId: 'x8841n',
        title: 'エルフの国の宮廷魔導師になれたので、とりあえず姫様に性的な悪戯をしてみました。',
        content:
          'キース・ブロックハウンドはしがない流浪の魔導師だったが、ひょんな事からエルフ領の小国で宮廷魔導師をする事になった。<br>\n' +
          '姫君の魔術家庭教師も任された彼は、それにかこつけて世間知らずのエルフ姫に性的な悪戯を始めるのだった。<br>\n' +
          '<br>\n' +
          'エロは３話辺りからです。あとはただエロいだけです。<br>\n' +
          '<br>\n' +
          '書籍化しました。KTC様より１、２巻が発売中です。<br>\n' +
          '漫画化されました。',
        count: episodes.length,
      })
    })
  })
  describe('異常系', () => {
    it('短編はエラー', async () => {
      expect(fetchToc('n1354ck')).rejects.toThrow('目次ページとして解析に失敗しました')
    })
    it('r18のオプション未指定はエラー', async () => {
      expect(fetchToc('n7663ct')).rejects.toThrow('年齢確認')
    })
  })
})
