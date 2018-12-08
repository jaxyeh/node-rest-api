const { Model, snakeCaseMappers } = require('objection')
const { DbErrors } = require('objection-db-errors')

class BaseModel extends DbErrors(Model) {
  static get idColumn () {
    return 'id'
  }

  static get columnNameMappers () {
    return snakeCaseMappers()
  }

  $beforeInsert () {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate () {
    this.updated_at = new Date().toISOString()
  }
}

module.exports = BaseModel
