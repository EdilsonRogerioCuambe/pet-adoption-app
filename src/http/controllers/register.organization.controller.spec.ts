import supertest from 'supertest'
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
    await supertest(app.server).post('/users').send({
      id: 'user_id_1',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@JohnDoe123',
    })

    const authUser = await supertest(app.server).post('/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@JohnDoe123',
    })

    const { token } = authUser.body

    const org = await supertest(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'organization_id_1',
        name: 'Fake Organization',
        whatsapp: '123456789',
        adress: 'Fake Street',
      })

    expect(org.statusCode).toBe(201)
  })
})
