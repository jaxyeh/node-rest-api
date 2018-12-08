const BaseModel = require('./BaseModel')
const { Model } = require('objectmodel')
const Joi = require('joi')

class User extends BaseModel {
  static get tableName () {
    return 'users'
  }

  fullName () {
    return this.firstName + ' ' + this.lastName
  }

  static get Model () {
    let model = new Model({
      id: [String],
      email: String,
      firstName: [String],
      lastName: [String],
      password: [String],
      passwordHash: [String],
      confirmationToken: [String],
      confirmedAt: [Date],
      confirmedSentAt: [Date],
      createdAt: [Date],
      updatedAt: [Date]
    })
    return model
  }

  static get SchemaCreate () {
    return {
      email: Joi.string().email().trim().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }

  static get SchemaLogin () {
    return {
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().required()
    }
  }
}

module.exports = User
