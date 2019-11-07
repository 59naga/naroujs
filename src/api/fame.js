import Joi from 'joi';
import { protocol } from './constant';

export const schema = {
  ncode: Joi.string().regex(/^n[\d\w]+$/i).required(),
};

export default {
  url: `${protocol}//api.syosetu.com/rank/rankin/`,
  schema: Joi.object(schema),
};
