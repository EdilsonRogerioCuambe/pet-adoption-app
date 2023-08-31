import request from 'supertest'
import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Register Organization Controller', () => {
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
        name: 'Organization',
        whatsapp: '123456789',
        address: 'Adress',
        password: '@Organization1710',
        email: 'organization@gmail.com',
        role: 'ADMIN',
      })

    expect(org.statusCode).toBe(201)
  }, 20000)
})
