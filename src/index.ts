import * as utils from './utils'
import novelapi from './api/novelapi'
import novel18api from './api/novel18api'
import rankapi from './api/rank'
import fameapi from './api/fame'

export async function search(params: any = {}) {
  return utils.fetchSearch(novelapi, params)
}
export async function pickup(params: any = {}) {
  return utils.fetchSearch(novelapi, { ispickup: 1, order: 'hyoka', lim: 200, ...params })
}
export async function searchX(params: any = {}) {
  return utils.fetchSearch(novel18api, params)
}

export async function noc(params = {}) {
  return utils.fetchSearch(novel18api, { nocgenre: 1, ...params })
}
export async function mnlt(params = {}) {
  return utils.fetchSearch(novel18api, { nocgenre: 2, ...params })
}
export async function bl(params = {}) {
  return utils.fetchSearch(novel18api, { nocgenre: 3, ...params })
}
export async function mid(params = {}) {
  return utils.fetchSearch(novel18api, { nocgenre: 4, ...params })
}

export async function rank(params = {}) {
  return utils.fetchRank(rankapi, params)
}

export async function fame(params = {}) {
  return utils.fetchFame(fameapi, params)
}

export async function fetchPage(ncode: string, page: number = 0, opts: any = {}) {
  const { uri, $container, isToc } = await utils.buildCheerio(ncode, {
    ...opts,
    page,
  })
  if (isToc) {
    throw new Error(`${uri}\nError: fetchPage>目次ページに対しては使用できません。toc()を使用してください`)
  }

  const extracted = page ? utils.extractNovel($container) : utils.extractShortstory($container)
  return {
    uri,
    ...extracted,
  }
}

export async function fetchToc(ncode: string, opts: any = {}) {
  const { uri, $, $container, $chapters, $rootEpisodes, isToc } = await utils.buildCheerio(ncode, opts)
  if (!isToc) {
    throw new Error(`${uri}\nError: fetchToc>目次ページとして解析に失敗しました`)
  }

  const { chapters, episodes } = utils.extractChapterAndEpisode($, $chapters, $rootEpisodes)
  const author = $container.find('.novel_writername>a').text().trim()
  const authorId = utils.getId($container.find('.novel_writername>a').attr('href'))
  const title = $container.find('.novel_title').text().trim()
  const content = $container.find('#novel_ex').html()?.trim()
  let count
  if (chapters.length) {
    count = chapters[chapters.length - 1].episodes.slice(-1)[0].page
  } else {
    count = episodes.length
  }

  return {
    uri,
    author,
    authorId,
    title,
    content,
    count,
    chapters,
    episodes,
  }
}
