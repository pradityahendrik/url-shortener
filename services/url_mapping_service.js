const { urlMappingRepository } = require('../repositories');
const { urlMappingTransformer } = require('../transformers');

const UrlMappingService = function(){};

UrlMappingService.prototype.shorten = async (url) => {
    const shortCode = await generateShortCode();
    const payload = urlMappingTransformer.saveShortenPayload(url, shortCode);
    const result = await urlMappingRepository.save(payload);
    return result;
}

UrlMappingService.prototype.getByShortCode = async (shortCode) => {
    return urlMappingRepository.findOneOrFail({ short_code: shortCode });
}

const generateShortCode = async () => {
    return Math.random().toString(36).substr(2, 6);
};

module.exports = UrlMappingService
