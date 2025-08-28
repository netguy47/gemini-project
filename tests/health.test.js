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

test('GET / returns { ok: true }', async () => {
  const res = await request(server).get('/');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});
