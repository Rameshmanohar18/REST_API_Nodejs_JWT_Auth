const request = require('supertest');

const app = require('../app');

describe('Auth APIs', () => {

  test('Register User', async () => {

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Ramesh',
        email: 'ramesh@gmail.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(201);

  });

});