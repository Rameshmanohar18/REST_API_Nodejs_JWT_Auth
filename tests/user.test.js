const request = require('supertest');

const app = require('../app');

describe('User APIs', () => {

  test('Get All Users', async () => {

    const response = await request(app)
      .get('/api/v1/users');

    expect(response.statusCode).toBe(401);

  });

});