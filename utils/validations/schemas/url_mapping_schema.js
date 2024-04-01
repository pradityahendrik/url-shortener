const Joi = require('joi');

const urlMappingSchema = {
  shortenUrl: {
    body: Joi.object({
      url: Joi.string().required(),
    })
  },
  getByShortCode: {
    params: Joi.object({
      shortCode: Joi.string().required().min(6).max(6),
    })
  }
};

module.exports = { urlMappingSchema };