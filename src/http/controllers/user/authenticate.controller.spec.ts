import { test, expect, describe, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should return 200 when authenticate with valid credentials', async () => {
    await request(app.server).post('/users').send({
      id: '1',
      name: 'User',
      email: 'user@gmail.com',
      password: '@user17D',
      role: 'ADMIN',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'user@gmail.com',
      password: '@user17D',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
