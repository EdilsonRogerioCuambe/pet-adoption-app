import { app } from '@/app'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

describe('Delete Organization Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 204 when organization is deleted', async () => {
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

    const org = await request(app.server)
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

    const getOrg = await request(app.server)
      .get(`/organizations/${org.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .delete(`/organizations/${getOrg.body.organization.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  }, 20000)
})
