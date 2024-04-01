exports.generateShortCode = async () => {
    return Math.random().toString(36).substr(2, 6);
};

module.exports = exports;