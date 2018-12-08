
const request = require('supertest')
const app = require('../../src/app')

describe('Main', () => {
  describe('GET /boom', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request(app.callback())
        .get('/boom')
        .expect('Content-Type', /json/)
        .expect(403)

      const { statusCode, error, message } = res.body
      expect(statusCode).toBe(403)
      expect(error).toBe('Forbidden')
      expect(message).toBe('Forbidden')
    })
  })

  describe('GET /ping', () => {
    it('<200> should always return with the API server information', async () => {
      const res = await request(app.callback())
        .get('/ping')
        .expect('Content-Type', /json/)
        .expect(200)

      const { healthy } = res.body
      expect(healthy).toBe(true)
    })
  })
})
