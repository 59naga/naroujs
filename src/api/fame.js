import Joi from 'joi';

export const schema = {
  ncode: Joi.string().regex(/^n[\d\w]+$/i).required(),
};

export default {
  url: 'http://api.syosetu.com/rank/rankin/',
  schema: Joi.object(schema),
};
