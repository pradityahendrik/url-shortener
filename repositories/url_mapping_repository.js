var UrlMapping = require('../databases/models/url_mapping');

var UrlMappingRepository = function () {};

UrlMappingRepository.prototype.check = async () => {
  return UrlMapping.findAll();
}

module.exports = UrlMappingRepository
