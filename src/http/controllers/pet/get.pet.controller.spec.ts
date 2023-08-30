import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

describe('Get Pet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
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

    const me = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const pet = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Pet')
      .field('age', '1')
      .field('breed', 'Breed')
      .field('size', 'Size')
      .field('description', 'Description')
      .field('city', 'City')
      .field('organizationId', org.body.id)
      .field('userId', me.body.id)
      .attach('images', 'src/http/controllers/__tests__/assets/dog.jpg')

    const response = await request(app.server)
      .get(`/pets/${pet.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  }, 20000)
})
