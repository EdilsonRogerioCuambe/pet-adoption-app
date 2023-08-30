import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when user is created', async () => {
    const organization = await request(app.server).post('/organizations').send({
      id: '123456789',
      name: 'Organization',
      photo: 'foto.jpg',
      whatsapp: '123456789',
      adress: 'Rua 1',
    })

    const response = await request(app.server).post('/users').send({
      name: 'User',
      email: 'user@gmail.com',
      password: '@user17D',
      organizationId: organization.body.id,
    })

    expect(response.statusCode).toBe(201)
  })
})
