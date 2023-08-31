import { app } from '@/app'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

describe('Get Organization Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when organization is created', async () => {
    await request(app.server).post('/users').send({
      id: 'user_id_1',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@JohnDoe123',
      role: 'ADMIN',
    })

    const authUser = await request(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@JohnDoe123',
    })

    const { token } = authUser.body

    const org = await request(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'organization_id_1',
        name: 'Organization',
        whatsapp: '123456789',
        address: 'Adress',
        password: '@Organization1710',
        email: 'organization@gmail.com',
        role: 'ADMIN',
      })

    const response = await request(app.server)
      .get(`/organizations/${org.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  }, 20000)
})
