import { app } from '@/app'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

describe('Update User Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 204 when user is updated', async () => {
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

    const response = await request(app.server)
      .put(`/users/${user.body.user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: user.body.user.id,
        name: 'User',
        email: 'user@gmail.com',
        password: '@User1710',
        organizationId: org.body.id,
      })

    expect(response.statusCode).toBe(204)
  }, 20000)
})
