import Joi from 'joi';
import { protocol } from './constant';

export const schema = {
  rtype: Joi.string().regex(/\d{8}-\w/).required(),
};

export default {
  url: `${protocol}//api.syosetu.com/rank/rankget/`,
  schema: Joi.object(schema),
};
