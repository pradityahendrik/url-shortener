var UrlMapping = require('../databases/models/url_mapping');

var UrlMappingRepository = function () {};

UrlMappingRepository.prototype.save = async (payload) => {
  const save = await UrlMapping.create({
    id: payload.id,
    long_url: payload.url,
    short_code: payload.shortCode
  })
  return save;
}

UrlMappingRepository.prototype.findOneOrFail = async (conditions, ) => {
  return UrlMapping.findOne(conditions);
}

module.exports = UrlMappingRepository
