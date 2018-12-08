
const request = require('supertest')
const app = require('../../src/app')
const db = require('../../src/db')

describe('Users', () => {
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

  describe('Create User', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request(app.callback())
        .get('/api/v1/ping')
        .expect('Content-Type', /json/)
        .expect(200)

      const { healthy } = res.body
      expect(healthy).toBe(true)
    })
  })
})
