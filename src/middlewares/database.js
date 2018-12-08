const Boom = require('boom')

const {
  ValidationError,
  NotFoundError
} = require('objection')

const {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection-db-errors')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof ValidationError) {
      switch (err.type) {
        case 'ModelValidation':
          ctx.throw(Boom.badRequest(err.message, {
            type: 'ModelValidation',
            data: err.data
          }))
          break
        case 'RelationExpression':
          ctx.throw(Boom.badRequest(err.message, {
            type: 'InvalidRelationExpression',
            data: {}
          }))
          break
        case 'UnallowedRelation':
          ctx.throw(Boom.badRequest(err.message, {
            type: 'UnallowedRelation',
            data: {}
          }))
          break
        case 'InvalidGraph':
          ctx.throw(Boom.badRequest(err.message, {
            type: 'InvalidGraph',
            data: {}
          }))
          break
        default:
          ctx.throw(Boom.badRequest(err.message, {
            type: 'UnknownValidationError',
            data: {}
          }))
          break
      }
    } else if (err instanceof NotFoundError) {
      ctx.throw(Boom.notFound(err.message, {
        type: 'NotFound',
        data: {}
      }))
    } else if (err instanceof UniqueViolationError) {
      ctx.throw(Boom.conflict(err.message, {
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      }))
    } else if (err instanceof NotNullViolationError) {
      ctx.throw(Boom.badRequest(err.message, {
        type: 'NotNullViolation',
        data: {
          column: err.column,
          table: err.table
        }
      }))
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.throw(Boom.conflict(err.message, {
        type: 'ForeignKeyViolation',
        data: {
          table: err.table,
          constraint: err.constraint
        }
      }))
    } else if (err instanceof CheckViolationError) {
      ctx.throw(Boom.badRequest(err.message, {
        type: 'CheckViolation',
        data: {
          table: err.table,
          constraint: err.constraint
        }
      }))
    } else if (err instanceof DataError) {
      ctx.throw(Boom.badRequest(err.message, {
        type: 'InvalidData',
        data: {}
      }))
    } else if (err instanceof DBError) {
      ctx.throw(Boom.badImplementation(err.message, {
        type: 'UnknownDatabaseError',
        data: {}
      }))
    }

    // Continue through other middleware
    ctx.throw(err)
  }
}
