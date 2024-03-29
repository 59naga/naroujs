import Joi from 'joi'
import { createHyphonRegexp, rangeRegexp } from './helpers'

const valid = {
  order: [
    'allunique',
    'favnovelcnt',
    'reviewcnt',
    'hyoka',
    'hyokaasc',
    'impressioncnt',
    'hyokacnt',
    'hyokacntasc',
    'weekly',
    'lengthdesc',
    'lengthasc',
    'ncodedesc',
    'old',
  ],
  of: [
    '-',
    't',
    'n',
    'u',
    'w',
    's',
    'bg',
    'g',
    'k',
    'gf',
    'gl',
    'nt',
    'e',
    'ga',
    'l',
    'ti',
    'i',
    'ir',
    'ibl',
    'igl',
    'izk',
    'its',
    'iti',
    'p',
    'gp',
    'f',
    'r',
    'a',
    'ah',
    'sa',
    'ka',
    'nu',
    'ua',
  ],
  biggenre: [1, 2, 3, 4, 99, 98],
  genre: [
    101, 102, 201, 202, 301, 302, 303, 304, 305, 306, 307, 401, 402, 403, 404, 9901, 9902, 9903, 9904, 9999, 9801,
  ],
  type: ['t', 'r', 'er', 're', 'ter'],
  buntai: [1, 2, 4, 6],
  lastup: ['thisweek', 'lastweek', 'sevenday', 'thismonth', 'lastmonth', '(\\d+)?-?(\\d+)?'],
}

export const schemaObject = {
  lim: Joi.number().min(1).max(500),
  st: Joi.number().min(1).max(2000),
  of: Joi.string().regex(createHyphonRegexp(valid.of)),
  order: Joi.string()
    .valid(...valid.order)
    .lowercase(),

  word: Joi.string(),
  notword: Joi.string(),
  title: Joi.number().valid(1, 0),
  ex: Joi.number().valid(1, 0),
  keyword: Joi.number().valid(1, 0),
  wname: Joi.number().valid(1, 0),

  biggenre: Joi.string().regex(createHyphonRegexp(valid.biggenre)),
  notbiggenre: Joi.string().regex(createHyphonRegexp(valid.biggenre)),

  genre: Joi.string().regex(createHyphonRegexp(valid.genre)),
  notgenre: Joi.string().regex(createHyphonRegexp(valid.genre)),

  userid: Joi.string().regex(createHyphonRegexp('\\d+')).lowercase(),

  isr15: Joi.number().valid(1, 0),
  isbl: Joi.number().valid(1, 0),
  isgl: Joi.number().valid(1, 0),
  iszankoku: Joi.number().valid(1, 0),
  istensei: Joi.number().valid(1, 0),
  istenni: Joi.number().valid(1, 0),
  istt: Joi.number().valid(1, 0),

  notr15: Joi.number().valid(1, 0),
  notbl: Joi.number().valid(1, 0),
  notgl: Joi.number().valid(1, 0),
  notzankoku: Joi.number().valid(1, 0),
  nottensei: Joi.number().valid(1, 0),
  nottenni: Joi.number().valid(1, 0),
  nottt: Joi.number().valid(1, 0),

  minlen: Joi.number(),
  maxlen: Joi.number(),
  length: Joi.string().regex(rangeRegexp),

  kaiwaritu: Joi.string().regex(rangeRegexp),
  sasie: Joi.string().regex(rangeRegexp),

  mintime: Joi.number(),
  maxtime: Joi.number(),
  time: Joi.string().regex(rangeRegexp),

  ncode: Joi.string().regex(createHyphonRegexp('n[\\d\\w]+')),

  type: Joi.string()
    .valid(...valid.type)
    .lowercase(),
  buntai: Joi.string().regex(createHyphonRegexp(valid.buntai)),

  stop: Joi.number().valid(1, 2, 0),
  ispickup: Joi.number().valid(1, 0),

  lastup: Joi.string().regex(new RegExp(`^(${valid.lastup.join('|')})$`)),
}

export default {
  url: `http://api.syosetu.com/novelapi/api/`,
  schema: Joi.object(schemaObject),
}
