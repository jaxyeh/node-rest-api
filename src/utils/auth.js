const { jwtSecret, jwtOptions } = require('../../config')

const { pick } = require('lodash')
const jwt = require('jsonwebtoken')
const upash = require('upash')
const argon2 = require('@phc/argon2')
const crypto = require('crypto')

upash.install('argon2', argon2)

const createHash = async (password) => {
  return upash.hash(password)
}

const verifyHash = async (hash, password) => {
  return upash.verify(hash, password)
}

const generateToken = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(256, (err, buffer) => {
      if (err) {
        return reject(err)
      }
      resolve(crypto
        .createHash('sha1')
        .update(buffer)
        .digest('hex')
      )
    })
  })
}

const generateJWTforUserModel = (user = {}) => {
  return Object.assign({}, user, {
    token: jwt.sign({
      sub: pick(user, ['id', 'email'])
    }, jwtSecret, jwtOptions)
  })
}

module.exports = {
  createHash,
  verifyHash,
  generateToken,
  generateJWTforUserModel
}
