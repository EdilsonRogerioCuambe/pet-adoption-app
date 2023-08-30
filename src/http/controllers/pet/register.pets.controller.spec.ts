import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import supertest from 'supertest'
import { app } from '@/app'

describe('Register Pets Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when register a pet', async () => {
    const user = await supertest(app.server).post('/users').send({
      id: 'user_id_1',
      name: 'User',
      email: 'user@gmail.com',
      password: '@User1710',
      role: 'ADMIN',
    })

    const authUser = await supertest(app.server).post('/sessions').send({
      email: 'user@gmail.com',
      password: '@User1710',
    })

    const token = authUser.body.token

    const org = await supertest(app.server)
      .post('/organizations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'organization_id_1',
        name: 'Organization',
        whatsapp: '123456789',
        adress: 'Adress',
      })

    await supertest(app.server)
      .put(`/users/user_id_1`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'user_id_1',
        name: 'User',
        email: 'user@gmail.com',
        password: '@User1710',
        organizationId: 'organization_id_1',
      })

    const response = await supertest(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Pet')
      .field('age', '1')
      .field('breed', 'Breed')
      .field('size', 'Size')
      .field('description', 'Description')
      .field('city', 'City')
      .field('organizationId', org.body.id)
      .field('userId', user.body.user.id)
      .attach('images', 'src/http/controllers/__tests__/assets/dog.jpg')

    expect(response.statusCode).toBe(201)
  }, 20000)
})
