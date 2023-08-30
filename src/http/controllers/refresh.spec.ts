import { app } from '@/app'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'
import request from 'supertest'

describe('Refresh Token', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      id: '1',
      name: 'User',
      email: 'user@gmail.com',
      password: '@user17D',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'user@gmail.com',
      password: '@user17D',
    })

    const refreshToken = response.get('Set-Cookie')

    const refreshResponse = await request(app.server)
      .patch('/refresh/token')
      .set('Cookie', refreshToken)
      .send()

    expect(refreshResponse.status).toBe(200)
    expect(refreshResponse.body).toHaveProperty('token')
  })
})
