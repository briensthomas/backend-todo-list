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

const newTask = {
  detail: 'Need to add this task'
};

const agent = request.agent(app);

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('#POST /api/v1/todos adds a new task for the user', async () => {
    
    await agent.post('/api/v1/users').send(mockUser);

    const res = await agent.post('/api/v1/todos').send(newTask);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      detail: 'Need to add this task',
      user_id: expect.any(String),
      status: false
    });
  });

  it('#GET /todos lists all tasks for the user', async () => {
    await agent.post('/api/v1/users').send(mockUser);
    await agent.post('/api/v1/todos').send(newTask);

    const res = await agent.get('/api/v1/todos');
    // console.log('res.body', res.body);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      detail: expect.any(String),
      user_id: expect.any(String),
      status: false
    });
  });

  it('#PUT /todos/:id updates a task for the user', async () => {

    await agent.post('/api/v1/users').send(mockUser);

    const updatedTask = {
      status: true
    };

    const postRes = await agent.post('/api/v1/todos').send(newTask);
    // console.log('postRes.id', postRes.body.id);
    expect(postRes.status).toBe(200);
    const res = await agent.put(`/api/v1/todos/${postRes.body.id}`).send(updatedTask);

    // console.log('res.body', res.body);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  it('#DELETE /todos/:id deletes a task for user', async () => {
    await agent.post('/api/v1/users').send(mockUser);
    await agent.post('/api/v1/todos').send(newTask);
    const res = await agent.delete('/api/v1/todos/1');

    expect(res.status).toBe(200);
    
  });

});
