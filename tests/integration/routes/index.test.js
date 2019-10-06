const dayjs = require('dayjs');
const request = require('supertest');
const app = require('./../../../app');
const userModel = require('./../../../src/models/user');
const streamModel = require('./../../../src/models/stream');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const {
  buildBaseUrl,
  buildUserUrl,
  buildStreamUrl,
} = require('./../../utils/routeHelper');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('Routes', () => {
  describe('Test Route', () => {
    test('should return with 200 and Hello World', async () => {
      const url = buildBaseUrl();
      const response = await request(app).get(url);

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello World!');
    });
  });

  describe('Api Docs Route', () => {
    test('should return with 301 to swagger docs', async () => {
      const url = buildBaseUrl();
      const response = await request(app).get(`${url}/docs`);

      expect(response.statusCode).toBe(301);
    });
  });

  describe('User Create Route', () => {
    test('should return with 200 and token', async () => {
      const url = buildUserUrl();
      const response = await request(app).get(url);

      const user = await userModel.findOne().exec();

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ token: user.token });
    });
  });

  describe('User Show Route', () => {
    test('should return with 404 with not found error', async () => {
      const url = buildUserUrl({ user: 'abc123' });
      const response = await request(app).get(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 200 with stream details for user', async () => {
      const user = await userModel.create({ token: 'abc123' });
      const url = buildUserUrl({ user: user.token });

      const response = await request(app).get(url);
      const { streamCount, streams } = user.toObject();

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ streamCount, streams });
    });
  });

  describe('Stream Create Route', () => {
    test('should return with 404 with not found error', async () => {
      const url = buildStreamUrl({ user: 'abc123' });

      const response = await request(app).get(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 403 with forbidden error', async () => {
      const stream1 = await streamModel.create({});
      const stream2 = await streamModel.create({});
      const stream3 = await streamModel.create({});

      const user = await userModel.create({
        token: 'abc123',
        streams: [stream1._id, stream2._id, stream3._id],
      });

      const url = buildStreamUrl({ user: user.token });
      const response = await request(app).get(url);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('Error - Forbidden');
    });

    test('should return with 200 with stream details', async () => {
      const user = await userModel.create({ token: 'abc123' });
      const url = buildStreamUrl({ user: user.token });
      const response = await request(app).get(url);

      const stream = await streamModel.findOne().exec();
      const expectedResponse = { stream: stream._id };

      expect(response.statusCode).toBe(200);
      expect(JSON.stringify(response.body)).toBe(
        JSON.stringify(expectedResponse),
      );
    });
  });

  describe('Stream Persist Route', () => {
    test('should return with 404 with not found error if no user token', async () => {
      const stream = await streamModel.create({});
      const url = buildStreamUrl({ user: '', stream: stream._id });

      const response = await request(app).patch(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 404 with not found error if not valid stream', async () => {
      const user = await userModel.create({
        token: 'abc123',
      });
      const url = buildStreamUrl({ user: user.token, stream: 'invalidStream' });

      const response = await request(app).patch(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 403 with forbidden error if stream expired', async () => {
      const stream = await streamModel.create({
        updatedAt: dayjs().subtract(1, 'hour'),
      });
      const user = await userModel.create({
        token: 'abc123',
        streams: [stream._id],
      });
      const url = buildStreamUrl({ user: user.token, stream: stream._id });
      const response = await request(app).patch(url);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('Error - Forbidden');
    });
  });

  describe('Stream Destroy Route', () => {
    test('should return with 404 with not found error if no user token', async () => {
      const stream = await streamModel.create({});
      const url = buildStreamUrl({ user: '', stream: stream._id });

      const response = await request(app).delete(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 404 with not found error if not valid stream', async () => {
      const user = await userModel.create({
        token: 'abc123',
      });
      const url = buildStreamUrl({ user: user.token, stream: 'invalidStream' });

      const response = await request(app).delete(url);

      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Error - Not Found');
    });

    test('should return with 403 with forbidden error if stream expired', async () => {
      const stream = await streamModel.create({
        updatedAt: dayjs().subtract(1, 'hour'),
      });
      const user = await userModel.create({
        token: 'abc123',
        streams: [stream._id],
      });
      const url = buildStreamUrl({ user: user.token, stream: stream._id });
      const response = await request(app).delete(url);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('Error - Forbidden');
    });
  });
});
