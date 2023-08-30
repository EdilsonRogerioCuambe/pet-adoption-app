import { test, expect, describe, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import supertest from 'supertest'

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should return 200 when authenticate with valid credentials', async () => {
    const request = supertest(app.server)

    await request.post('/users').send({
      id: '1',
      name: 'User',
      email: 'user@gmail.com',
      password: '@user17D',
    })

    const response = await request.post('/sessions').send({
      email: 'user@gmail.com',
      password: '@user17D',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
