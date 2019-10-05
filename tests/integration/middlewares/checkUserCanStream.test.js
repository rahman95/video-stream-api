const dayjs = require('dayjs');
const checkUserCanStream = require('./../../../src/middlewares/checkUserCanStream');
const userModel = require('./../../../src/models/user');
const streamModel = require('./../../../src/models/stream');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const {
  mockRequest,
  mockResponse,
  mockNext,
} = require('./../../utils/expressHelper');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('checkUserCanStream Middleware', () => {
  test('check method throws error when no user', async () => {
    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await checkUserCanStream(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Error - No User found');
  });

  test('check method throws error when user already has 3 streams', async () => {
    const stream1 = await streamModel.create({});
    const stream2 = await streamModel.create({});
    const stream3 = await streamModel.create({});

    const user = await userModel.create({
      token: 'abc123',
      streams: [stream1._id, stream2._id, stream3._id],
    });

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    mockRes.locals.user = user;

    await checkUserCanStream(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.send).toHaveBeenCalledWith('Error - Forbidden');
  });

  test('check method is successful and returns next', async () => {
    const date = dayjs();
    const stream = await streamModel.create({ updatedAt: date });
    const user = await userModel.create({
      token: 'abc123',
      streams: [stream._id],
    });

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    mockRes.locals.user = user;

    await checkUserCanStream(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
