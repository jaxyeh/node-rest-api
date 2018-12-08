const config = require('../../config')

const { pick } = require('lodash')
const Boom = require('boom')
const Joi = require('joi')

const User = require('../models/User')
const { confirmationExpired } = require('../utils/mailer')
const { createHash, verifyHash, generateToken, generateJWTforUserModel } = require('../utils/auth')

const Queue = require('bull')
const emailQueue = new Queue('sendEmail', config.redis)

const validate = (ctx, schema) => {
  const { error, value } = Joi.validate(ctx.request.body, schema)
  if (error) {
    ctx.throw(Boom.badData(error.details[0].message))
  }
  return User.Model(value)
}

const stripData = (user = {}) => {
  return pick(user, ['id', 'email'])
}

module.exports.get = async (ctx) => {
  const userModel = ctx.state.user
  delete userModel.passwordHash
  delete userModel.confirmationToken

  ctx.body = userModel
  ctx.status = 200
}

module.exports.create = async (ctx) => {
  // TODO: Consider Joi to validate Password
  // const opts = { abortEarly: false, context: { validatePassword: true } }
  const userModel = validate(ctx, User.SchemaCreate)

  // Hash Password
  userModel.passwordHash = await createHash(userModel.password)
  userModel.confirmationToken = await generateToken()
  userModel.confirmedSentAt = new Date()
  delete userModel.password

  // Insert to Database
  const user = await User.query().insert(userModel)

  // TODO: Send Email Confirmation
  const confirmationLink = `http://localhost:${config.port}/api/v1/user/confirm/${userModel.confirmationToken}`
  const message = {
    to: user.email,
    subject: 'User Confirmation',
    text: `Hi ${user.fullName()}, please go to this url address to complete your user registeration: ${confirmationLink}.`,
    html: `<p>Hi ${user.fullName()},</p><p>Please click <a href="${confirmationLink}">here</a> to confirm user registeration.</p>`
  }
  emailQueue.add({ message })

  ctx.body = stripData(user)
  ctx.status = 200
}

module.exports.confirm = async (ctx) => {
  const { token } = ctx.params
  const user = await User.query().where('confirmation_token', token).first().throwIfNotFound()

  if (!user.confirmedSentAt || confirmationExpired(user.confirmedSentAt)) {
    // The confirmation token has expired!
    ctx.throw(Boom.badData('Confirmation has expired!'))
  }

  // User is confirmed!
  const data = {
    confirmed_at: new Date(),
    confirmation_token: null
  }
  await User.query().patch(data).where('confirmation_token', token)

  ctx.body = {
    statusCode: 200,
    message: 'user confirmed'
  }
  ctx.status = 200
}

module.exports.login = async (ctx) => {
  const userModel = validate(ctx, User.SchemaLogin)
  const user = await User.query().where('email', userModel.email).first()

  if (!user) {
    ctx.throw(Boom.unauthorized('User and Email does not match!'))
  }

  const verified = await verifyHash(user.passwordHash, userModel.password)
  if (!verified) {
    ctx.throw(Boom.unauthorized('User and Email does not match!'))
  }

  // Check if user has confirmed
  if (!user.confirmedAt) {
    ctx.throw(Boom.unauthorized('User has not yet confirmed!'))
  }

  const userData = stripData(user)
  ctx.body = generateJWTforUserModel(userData)
  ctx.status = 200
}
