const crypto = require('crypto')

const md5password = (password) => {
    const hash = crypto.createHash('md5')
    //  加密成16进制
    return hash.update(password).digest('hex')
}

module.exports = md5password
