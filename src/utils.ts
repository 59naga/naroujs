import got from 'got'
import cheerio from 'cheerio'

const syosetu = got.extend({
  prefixUrl: 'http://ncode.syosetu.com/',
})
const novel18 = got.extend({
  prefixUrl: 'http://novel18.syosetu.com/',
  headers: {
    Cookie: 'over18=yes',
  },
})

export function getId(href = '') {
  return href.split('/').slice(-2).join('')
}

export function getPageNumber(href = '') {
  const number = getId(href)
  if (number) {
    return Number(number)
  }
  return null
}

export function extractNovel($container: cheerio.Cheerio) {
  const [page, count] = $container.find('#novel_no').text().split('/')
  const chapter = $container.find('.chapter_title').text()
  const title = $container.find('.contents1>a').eq(0).text().trim()
  const author = $container.find('.contents1>a').eq(1).text().trim()
  const authorId = getId($container.find('.contents1>a').eq(1).attr('href'))
  const subtitle = $container.find('.novel_subtitle').text()
  const content = $container.find('#novel_honbun').html()?.trim()

  const header = ($container.find('#novel_p').html() || '').trim()
  const footer = ($container.find('#novel_a').html() || '').trim()

  const $ad = $container.find('#novel_contents>.center')
  $ad.find('.twitter-share-button, script').remove()
  const ad = ($ad.html() || '').trim()

  const prev = getPageNumber($container.find('.novel_bn :contains("前へ")').attr('href'))
  const next = getPageNumber($container.find('.novel_bn :contains("次へ")').attr('href'))

  return {
    count: Number(count),
    page: Number(page),
    author,
    authorId,
    title,
    chapter,
    subtitle,
    content,
    header,
    footer,
    ad,
    prev,
    next,
  }
}
export function extractShortstory($container: cheerio.Cheerio) {
  const author = $container.find('.novel_writername>a').text().trim()
  const authorId = getId($container.find('.novel_writername>a').attr('href'))
  const series = $container.find('.series_title>a').text().trim()
  const seriesId = getId($container.find('.series_title>a').attr('href'))
  const title = $container.find('.novel_title').text().trim()
  const content = $container.find('#novel_honbun').html()?.trim()

  const header = $container.find('#novel_p').html() || ''
  const footer = $container.find('#novel_a').html() || ''

  const $ad = $container.find('#novel_contents>.center')
  $ad.find('.twitter-share-button, script').remove()
  const ad = ($ad.html() || '').trim()

  return {
    author,
    authorId,
    series,
    seriesId,
    title,
    content,
    header,
    footer,
    ad,
  }
}
export function extractEpisode($episode: cheerio.Cheerio) {
  const $updated = $episode.find('.long_update span')
  const created = new Date($episode.find('.long_update').contents().get(0).nodeValue)
  const updatedMatched = ($updated.attr('title')?.match(/(.*?) 改稿/) || [])[1]
  const updated = $updated.length ? new Date(updatedMatched) : null
  return {
    page: getPageNumber($episode.find('.subtitle>a').attr('href')),
    subtitle: $episode.find('.subtitle').text().trim(),
    created,
    updated,
  }
}
export function extractChapterAndEpisode($: cheerio.Root, $chapters: cheerio.Cheerio, $rootEpisodes: cheerio.Cheerio) {
  const chapters = $chapters.toArray().map((chapter) => {
    const title = $(chapter).text().trim()
    const episodes = []

    let episode = $(chapter).next()
    while (episode.length && episode.prop('tagName') === 'DL') {
      episodes.push(extractEpisode(episode))
      episode = $(episode).next()
    }

    return {
      title,
      episodes,
    }
  })
  const episodes: any[] = []
  if (!chapters.length) {
    $rootEpisodes.toArray().forEach((episode) => {
      episodes.push(extractEpisode($(episode)))
    })
  }

  return { chapters, episodes }
}

export async function buildCheerio(ncode: string, opts: any = {}) {
  const client = opts.r18 ? novel18 : syosetu
  const path = opts.page > 0 ? `${ncode.toLowerCase()}/${opts.page}` : ncode.toLowerCase()
  const uri = `${client.defaults.options.prefixUrl}${path}`
  const html = await client(path).text()
  const $ = cheerio.load(html, { decodeEntities: false })
  const $container = $('#container')
  if (!$container.length) {
    // 年齢確認（通常APIで成人小説を取得するとエラー）
    throw new Error(`${uri}\n${$('#modal>h1,p:first-of-type').text().trim()}`)
  }

  const $chapters = $container.find('#novel_contents .chapter_title')
  const $rootEpisodes = $container.find('#novel_contents .index_box>.novel_sublist2')
  const isToc = $chapters.length > 0 || $rootEpisodes.length > 0

  return {
    uri,
    $,
    $container,
    $chapters,
    $rootEpisodes,
    isToc,
  }
}

export function stringifyValues(object: any = {}) {
  const stringifidObject: any = {}

  Object.keys(object).forEach((key: string) => {
    const value: any = object[key]

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        stringifidObject[key] = String(value)
        break

      case '[object Array]':
        stringifidObject[key] = value.join('-')
        break

      default:
        stringifidObject[key] = value
    }
  })

  return stringifidObject
}

export async function fetchSearch(api: any, params: any = {}): Promise<SearchResponse> {
  await api.schema.validateAsync(stringifyValues(params))
  const searchParams = {
    out: 'json',
    ...params,
  }
  // searchParams.gzip = 5 // application/x-gzipで来る
  const res = await got(api.url, { searchParams })
  const uri = res.requestUrl
  const [{ allcount }, ...items] = JSON.parse(res.body)
  return { uri, allcount, items }
}

export async function fetchRank(api: any, params: any = {}): Promise<RankResponse> {
  await api.schema.validateAsync(stringifyValues(params))
  const searchParams = {
    out: 'json',
    ...params,
  }
  // searchParams.gzip = 5 // application/x-gzipで来る
  const res = await got(api.url, { searchParams })
  const uri = res.requestUrl
  const items = JSON.parse(res.body)
  return { uri, items }
}

export async function fetchFame(api: any, params: any = {}): Promise<FameResponse> {
  await api.schema.validateAsync(stringifyValues(params))
  const searchParams = {
    out: 'json',
    ...params,
  }
  // searchParams.gzip = 5 // application/x-gzipで来る
  const res = await got(api.url, { searchParams })
  const uri = res.requestUrl
  const items = JSON.parse(res.body)
  return { uri, items }
}
