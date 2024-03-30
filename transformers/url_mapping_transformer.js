const { v4: uuidv4 } = require('uuid');

exports.saveShortenPayload = (url, shortCode) => {
    return {
        id: uuidv4(),
        url,
        shortCode
    };
}

exports.shortenUrlResponse = (data) => {
    return {
        long_url: data.long_url,
        short_url: `https://short.en/${data.short_code}`
    }
}

module.exports = exports;
