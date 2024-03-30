const urlMappingRepository = require('../repositories/url_mapping_repository');
const urlMappingTransformer = require('../transformers/url_mapping_transformer');

exports.shorten = async (url) => {
    try {
        const shortCode = await generateShortCode();
        // implement redis here, fallback to pg
        const check = await urlMappingRepository.findOneOrFail({ long_url: url });
        if (check) {
            // logger info
            return urlMappingTransformer.shortenUrlResponse(check);
        }
        const payload = urlMappingTransformer.saveShortenPayload(url, shortCode);
        const data = await urlMappingRepository.save(payload);
        const result = urlMappingTransformer.shortenUrlResponse(data);
        return result;
    } catch (err) {
        console.log(err);
        // return Result.response(err.code, err.message);
    }
};

exports.getByShortCode = async (shortCode) => {
    try {
        const data = await urlMappingRepository.findOneOrFail({ short_code: shortCode });
        // save to redis
        const result = urlMappingTransformer.shortenUrlResponse(data);
        return result;
    } catch (err) {
        console.log(err);
        // return Result.response(err.code, err.message);
    }
};

const generateShortCode = async () => {
    return Math.random().toString(36).substr(2, 6);
};

module.exports = exports;
