var UrlMapping = require('../databases/models/url_mapping');

exports.save = async (payload) => {
  const save = await UrlMapping.create({
    id: payload.id,
    long_url: payload.url,
    short_code: payload.shortCode
  })
  return save;
}

exports.findOne = async (conditions) => {
  return UrlMapping.findOne({ where: conditions });
}

module.exports = exports
