import Joi from 'joi'
import { createHyphonRegexp } from './helpers'
import { schemaObject } from './novelapi'

const valid = {
  nocgenre: [1, 2, 3, 4],
}

export const schema = {
  ...schemaObject,
  xid: Joi.string().regex(createHyphonRegexp('[\\d\\w]+')),
  nocgenre: Joi.string().regex(createHyphonRegexp(valid.nocgenre)),
  notnocgenre: Joi.string().regex(createHyphonRegexp(valid.nocgenre)),
}

export default {
  url: `http://api.syosetu.com/novel18api/api/`,
  schema: Joi.object(schema),
}
