exports.info = function (code = 200, message = '', data = null) {
    return {
        code,
        response: {
            message,
            data
        }
    };
};

exports.error = function (code = 500, message = '') {
    throw {
        code,
        message
    };
};

module.exports = exports;