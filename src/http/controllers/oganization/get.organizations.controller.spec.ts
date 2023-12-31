import { app } from '@/app'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

describe('Get Organizations Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all organizations', async () => {
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

    await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Organization 2',
        whatsapp: '123456789',
        address: 'Adress',
        password: '@Organization1710',
        email: 'organization2@gmail.com',
        role: 'ADMIN',
      })

    const response = await request(app.server)
      .get('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
