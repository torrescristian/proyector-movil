const joi = require('joi');

module.exports = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
};
