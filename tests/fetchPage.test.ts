import { fetchPage } from '../src'

describe('fetchPage', () => {
  describe('正常系', () => {
    it('無職転生1P', async () => {
      const { content, ...meta } = await fetchPage('n9669bk', 1)
      expect(meta).toStrictEqual({
        uri: 'http://ncode.syosetu.com/n9669bk/1',
        page: 1,
        count: 286,
        author: '理不尽な孫の手',
        authorId: '288399',
        title: '無職転生　- 異世界行ったら本気だす -',
        chapter: '第１章　幼年期',
        subtitle: 'プロローグ',
        header: '',
        footer: '',
        ad: '',
        prev: null,
        next: 2,
      })
      // 段落情報を保持したいため、原文を極力加工しない
      expect(content).toMatch(/^<p id="L1">　俺は34歳住所不定無職/)
      expect(content).toMatch(/トマトみたいに潰れて死んだ。<\/p>$/)
    })
    it('無職転生286P', async () => {
      const { content, footer, ...meta } = await fetchPage('n9669bk', 286)
      expect(meta).toStrictEqual({
        uri: 'http://ncode.syosetu.com/n9669bk/286',
        page: 286,
        count: 286,
        author: '理不尽な孫の手',
        authorId: '288399',
        title: '無職転生　- 異世界行ったら本気だす -',
        chapter: '最終章　完結編',
        subtitle: 'エピローグ「プロローグ・ゼロ」',
        header: '',
        ad: '',
        prev: 285,
        next: null,
      })
      expect(content).toMatch(/^<p id="L1">　甲龍暦500年。/)
      expect(content).toMatch(/　彼女が最後まで生き延びるかどうかは、まだ、誰にも分からない。<\/p>$/)
      expect(footer).toMatch(/^<p id="La1"><br><\/p>/)
      expect(footer).toMatch(/　ご愛読、誠にありがとうございました。<\/p>$/)
    })

    it('R18エルフの国のry 1P', async () => {
      const { content, ...meta } = await fetchPage('N7663CT', 1, { r18: true })
      expect(meta).toStrictEqual({
        uri: 'http://novel18.syosetu.com/n7663ct/1',
        count: 685,
        page: 1,
        author: '磯貝武連',
        authorId: 'x8841n',
        title: 'エルフの国の宮廷魔導師になれたので、とりあえず姫様に性的な悪戯をしてみました。',
        chapter: '',
        subtitle: '詐欺師からの大出世',
        header: '',
        footer:
          '<p id="La1">もう一つ書かせてもらっている方が全然エロくならないので、エロが書きたいとフラストレーションが溜まった結果出来た作品です。</p>',
        ad: '',
        next: 2,
        prev: null,
      })
      expect(content).toMatch(/^<p id="L1">　荘厳かつ華麗でありながら、/)
      expect(content).toMatch(/弦楽器にしてやりたくなるキースだった。<\/p>$/)
    })

    it('短編「いやだってお菓子あげたらついてくるっていうからさぁ！！」', async () => {
      const { content, ...meta } = await fetchPage('n1354ck')
      expect(meta).toStrictEqual({
        uri: 'http://ncode.syosetu.com/n1354ck',
        author: '結木さんと',
        authorId: '270309',
        series: 'お菓子な世界より',
        seriesId: 's5859c',
        title: 'いやだってお菓子あげたらついてくるっていうからさぁ！！',
        header: '',
        footer: '',
        ad: '',
      })
    })
  })
  describe('異常系', () => {
    it('存在しないページ番号', async () => {
      expect(fetchPage('n9669bk', 999)).rejects.toThrow('Response code 404')
    })
    it('目次ページを指定した場合', async () => {
      expect(fetchPage('n9669bk')).rejects.toThrow('目次ページに対しては使用できません')
    })
    it('短編でページ番号を指定した場合', async () => {
      expect(fetchPage('n1354ck', 1)).rejects.toThrow('Response code 404')
    })
    it('r18をオプションなしで取得する', async () => {
      expect(fetchPage('n7663ct')).rejects.toThrow('年齢確認')
      expect(fetchPage('n7663ct', 1)).rejects.toThrow('年齢確認')
    })
  })
})
