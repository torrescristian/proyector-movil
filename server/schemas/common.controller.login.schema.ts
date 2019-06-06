import joi from 'joi';

export const CommonControllerLoginSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
};
