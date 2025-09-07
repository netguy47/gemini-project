process.env.NODE_ENV = 'test';

const http = require('http');
const request = require('supertest');
const app = require('../index.js');

let server;

beforeAll(() => {
  server = http.createServer(app).listen(0);
});

afterAll(() => {
  server.close();
});

describe('POST /stories/:id/feedback validation', () => {
  test('rejects rating outside 1-5', async () => {
    const res = await request(server)
      .post('/stories/123/feedback')
      .send({ rating: 10 });
    expect(res.status).toBe(400);
  });

  test('rejects non-numeric rating', async () => {
    const res = await request(server)
      .post('/stories/123/feedback')
      .send({ rating: 'bad' });
    expect(res.status).toBe(400);
  });
});
