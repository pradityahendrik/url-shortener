const Joi = require('joi');

const urlMappingSchema = {
  shortenUrl: {
    body: Joi.object({
      url: Joi.string().required(),
    })
  },
  getByShortCode: {
    params: Joi.object({
      shortCode: Joi.string().required().max(6),
    })
  }
};

module.exports = { urlMappingSchema };