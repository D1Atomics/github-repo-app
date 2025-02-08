import * as Joi from 'joi';

export const validationSchema = Joi.object({
  GITHUB_API_URL: Joi.string().uri().required(),
});
