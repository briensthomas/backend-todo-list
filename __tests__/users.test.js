const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '123456',
};
const agent = request.agent(app);

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('#POST /api/v1/users creates a new user', async () => {
    const res = await request.agent(app).post('/api/v1/users').send(mockUser);
    const { firstName, lastName, email } = mockUser;

    console.log('res.body', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('#POST /api/v1/users/sessions should log in an existing user', async () => {
    await agent.post('/api/v1/users').send(mockUser);
    const res = await agent.post('/api/v1/users/sessions').send(mockUser);

    // console.log('res.body', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'You have successfully signed in!'
    });
  });

  it('#GET /me route returns the current user', async () => {
    const failRes = await request(app).get('/api/v1/users/me');
    expect(failRes.status).toBe(401);

    await agent.post('/api/v1/users').send(mockUser);
    const res = await agent.get('/api/v1/users/me');

    // console.log('res.body', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      exp: expect.any(Number),
      iat: expect.any(Number)
    });
  });
});
