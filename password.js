const bcrypt = require('bcrypt')

const saltRounds = 8

const pass2hash = function (password) {
    return bcrypt.hash(password, saltRounds)
}

const compare2hash = function (password, hash) {
    return bcrypt.compare(password, hash)
}

module.exports = {
    pass2hash,
    compare2hash
}