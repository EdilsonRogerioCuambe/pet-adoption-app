import { app } from '@/app'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Get Pets Controllers', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all pets', async () => {
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
        address: 'Adress',
        password: '@Organization1710',
        email: 'organization@gmail.com',
        role: 'ADMIN',
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

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Thor')
      .field('age', '6')
      .field('breed', 'second pet')
      .field('size', 'big')
      .field('description', 'Second description')
      .field('city', 'City')
      .field('organizationId', org.body.id)
      .field('userId', me.body.id)
      .attach('images', 'src/http/controllers/__tests__/assets/dog.jpg')

    const getPets = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(getPets.statusCode).toBe(200)
  }, 30000)
})
