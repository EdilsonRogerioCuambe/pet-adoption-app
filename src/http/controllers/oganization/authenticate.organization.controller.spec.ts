import { it, expect, beforeAll, afterAll, describe } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Organization Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when authenticate with valid credentials', async () => {
    await request(app.server).post('/users').send({
      name: 'User',
      email: 'user@gmail.com',
      password: '@User1710',
      role: 'ADMIN',
    })

    const authUser = await request(app.server).post('/sessions').send({
      email: 'user@gmail.com',
      password: '@User1710',
    })

    const token = authUser.body.token

    await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Organization',
        whatsapp: '123456789',
        address: 'Adress',
        password: '@Organization1710',
        email: 'organization@gmail.com',
        role: 'ADMIN',
      })

    const response = await request(app.server)
      .post('/sessions/organizations')
      .send({
        email: 'organization@gmail.com',
        password: '@Organization1710',
      })

    expect(response.statusCode).toBe(200)
  })

  it('should return 400 when authenticate with invalid credentials', async () => {
    const response = await request(app.server)
      .post('/sessions/organizations')
      .send({
        email: 'organization76@gmail.com',
        password: '@Organization091710',
      })

    expect(response.statusCode).toBe(400)
  })
})
