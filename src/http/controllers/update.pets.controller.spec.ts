import { app } from '@/app'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

describe('Update Pet Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 204 when update pet', async () => {
    const user = await request(app.server).post('/users').send({
      name: 'User',
      email: 'user@gmail.com',
      password: '@User1710',
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

    const getPet = await request(app.server)
      .get(`/pets/${pet.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const response = await request(app.server)
      .put(`/pets/${getPet.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('id', getPet.body.pet.id)
      .field('name', 'Pet')
      .field('age', '15')
      .field('size', 'big')
      .field('breed', 'Breed')
      .field('description', 'Description')
      .field('city', 'City')
      .attach('images', 'src/http/controllers/__tests__/assets/dog.jpg')

    expect(response.statusCode).toBe(204)
  }, 20000)
})
