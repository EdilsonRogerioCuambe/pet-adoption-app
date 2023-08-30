import { app } from '@/app'
import supertest from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when user is authenticated', async () => {
    await supertest(app.server)
      .post('/users')
      .field('name', 'John Doe')
      .field('email', 'john@gmail.com')
      .field('password', '@JohnDoe123')

    const response = await supertest(app.server).post('/sessions').send({
      email: 'john@gmail.com',
      password: '@JohnDoe123',
    })

    const { token } = response.body

    const profileResponse = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toBe(200)
  })
})
