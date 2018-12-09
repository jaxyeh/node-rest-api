
const request = require('supertest')
const app = require('../../src/app')
const db = require('../../src/db')

describe('User API Integration Tests', () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    // await db.seed.run()
    jest.clearAllMocks()
  })

  afterEach(async () => {
    await db.migrate.rollback()
  })

  afterAll(async () => {
    await db.destroy()
  })

  describe('Fail to login', () => {
    it('<401 Forbidden> should always return when no authenticated user', async () => {
      const res = await request(app.callback())
        .post('/api/v1/user')
        .send({ email: 'johndoe@example.com', password: 'test' })
        .expect('Content-Type', /json/)
        .expect(405)

      const { error } = res.body
      expect(error).toBe('Method Not Allowed')
    })
  })

  describe('Create User', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request(app.callback())
        .post('/api/v1/user/register')
        .send({
          email: 'johndoe@example.com',
          password: 'test',
          firstName: 'John',
          lastName: 'Doe'
        })
        .expect('Content-Type', /json/)
        .expect(200)

      console.log(res.body)
      // const { healthy } = res.body
      // expect(healthy).toBe(true)
    })
  })
})
