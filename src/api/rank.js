import Joi from 'joi';

export const schema = {
  rtype: Joi.string().regex(/\d{8}-\w/),
};

export default {
  url: 'http://api.syosetu.com/rank/rankget/',
  schema: Joi.object(schema),
};
