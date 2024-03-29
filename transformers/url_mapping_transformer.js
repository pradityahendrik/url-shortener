const { v4: uuidv4 } = require('uuid');
const UrlMappingTransformer = function(){};

UrlMappingTransformer.prototype.saveShortenPayload = (url, shortCode) => {
    const payload = {
        id: uuidv4(),
        url,
        shortCode
    };

    return payload;
}

module.exports = UrlMappingTransformer
