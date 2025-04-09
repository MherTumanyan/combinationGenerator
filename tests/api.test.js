const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/models/response', () => ({
  saveResponse: jest.fn().mockResolvedValue(42),
  getResponseById: jest.fn(),
}));

jest.mock('../src/config/db', () => ({
  pool: {
    getConnection: jest.fn().mockResolvedValue({
      query: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
    }),
  },
  initialize: jest.fn(),
}));

describe('Combinations API', () => {
  test('POST /api/combinations/generate should generate combinations', async () => {
    const response = await request(app)
      .post('/api/combinations/generate')
      .send({
        items: [1, 2, 1],
        length: 2,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 42);
    expect(response.body).toHaveProperty('combination');
    expect(Array.isArray(response.body.combination)).toBe(true);
    expect(response.body.combination.length).toBe(5);
  });

  test('should return 400 for invalid input', async () => {
    const response = await request(app)
      .post('/api/combinations/generate')
      .send({
        items: 'not an array',
        length: 'not a number',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('should return 400 for negative length', async () => {
    const response = await request(app)
      .post('/api/combinations/generate')
      .send({
        items: [1, 2, 3],
        length: -1,
      });

    expect(response.status).toBe(400);
  });
});
