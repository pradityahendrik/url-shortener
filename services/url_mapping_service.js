const urlMappingRepository = require('../repositories/url_mapping_repository');
const urlMappingTransformer = require('../utils/transformers/url_mapping_transformer');
const response = require('../utils/helpers/response');
const redisClient = require('../databases/redis');
const constant = require('../utils/constants/url_mapping_constant');
const helper = require('../utils/helpers/helper');

exports.shorten = async (url) => {
    try {
        const shortCode = await helper.generateShortCode();
        const check = await urlMappingRepository.findOne({ long_url: url });
        if (check) {
            const result = urlMappingTransformer.shortenUrlResponse(check);
            return response.info(200, 'success', result);
        }
        const payload = urlMappingTransformer.saveShortenPayload(url, shortCode);
        const data = await urlMappingRepository.save(payload);
        const result = urlMappingTransformer.shortenUrlResponse(data);
        await redisClient.set(`${constant.prefixKey}${shortCode}`, JSON.stringify(data));
        return response.info(200, 'success', result);
    } catch (err) {
        return response.info(err.code, err.message);
    }
};

exports.getByShortCode = async (shortCode) => {
    try {
        let data;
        const cache = await redisClient.get(`${constant.prefixKey}${shortCode}`)

        if (cache) {
            data = JSON.parse(cache);
        } else {
            data = await urlMappingRepository.findOne({ short_code: shortCode });
            await redisClient.set(`${constant.prefixKey}${shortCode}`, JSON.stringify(data));
        }

        if (!data) {
            throw response.error(404, 'Data not found');
        }
        
        const result = urlMappingTransformer.shortenUrlResponse(data);
        return response.info(200, 'success', result);
    } catch (err) {
        return response.info(err.code, err.message);
    }
};

module.exports = exports;
