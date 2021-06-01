const crypto = require('crypto');

function cryptoPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = cryptoPassword;
