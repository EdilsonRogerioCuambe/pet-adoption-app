import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Get Users Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all users', async () => {
    const user = await request(app.server).post('/users').send({
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

    const org = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Organization',
        whatsapp: '123456789',
        adress: 'Adress',
      })

    await request(app.server)
      .put(`/users/${user.body.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: user.body.user.id,
        name: 'User',
        email: 'user@gmail.com',
        passsword: '@User1710',
        organizationId: org.body.id,
      })

    await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.users).toHaveLength(1)
  })
})
