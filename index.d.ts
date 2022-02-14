type RankResponse = {
  uri: string
  items: RankItem[]
}
type RankItem = {
  ncode: string
  pt: number
  rank: number
}

type FameResponse = {
  uri: string
  items: FameItem[]
}
type FameItem = {}

type SearchResponse = {
  uri: string
  allcount: number
  items: SearchItem[]
}
type SearchItem = {
  title: string
  ncode: string
  userid: number
  writer: string
  story: string
  biggenre: number
  genre: number
  gensaku: string
  keyword: string
  general_firstup: string
  general_lastup: string
  novel_type: number
  end: number
  general_all_no: number
  length: number
  time: number
  isstop: number
  isr15: number
  isbl: number
  isgl: number
  iszankoku: number
  istensei: number
  istenni: number
  pc_or_k: number
  global_point: number
  daily_point: number
  weekly_point: number
  monthly_point: number
  quarter_point: number
  yearly_point: number
  fav_novel_cnt: number
  impression_cnt: number
  review_cnt: number
  all_point: number
  all_hyoka_cnt: number
  sasie_cnt: number
  kaiwaritu: number
  novelupdated_at: string
  updated_at: string
}
