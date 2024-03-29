const { urlMappingRepository } = require('../repositories');

const UrlMappingService = function(){};

UrlMappingService.prototype.check = async () => {
    const result = await urlMappingRepository.check();
    return result;
}

module.exports = UrlMappingService
