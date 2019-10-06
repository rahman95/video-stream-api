const dayjs = require('dayjs');
const checkStreamIdentifier = require('./../../../src/middlewares/checkStreamIdentifier');
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

describe('checkUserToken Middleware', () => {
  test('check method throws error when no stream id passed', async () => {
    const mockReq = mockRequest({});
    const mockRes = mockResponse();

    await checkStreamIdentifier(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith(
      'Error - No stream identifier passed',
    );
  });

  test('check method throws error when stream id not found', async () => {
    const mockReq = mockRequest({ stream: 'abc123' });
    const mockRes = mockResponse();

    await checkStreamIdentifier(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Error - Not Found');
  });

  test('check method throws error when stream is no longer valid', async () => {
    const expiredUpdateAt = dayjs().subtract(1, 'hour');
    const stream = await streamModel.create({ updatedAt: expiredUpdateAt });
    const mockReq = mockRequest({ stream: stream._id });
    const mockRes = mockResponse();

    await checkStreamIdentifier(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.send).toHaveBeenCalledWith('Error - Forbidden');
  });

  test('check method attaches stream to response and passes forwards if valid stream id', async () => {
    const date = dayjs();
    const stream = await streamModel.create({ updatedAt: date });

    const mockReq = mockRequest({ stream: stream._id });
    const mockRes = mockResponse();

    await checkStreamIdentifier(mockReq, mockRes, mockNext);

    expect(mockRes.locals).toHaveProperty('stream');
    expect(mockRes.locals.stream).toBeInstanceOf(streamModel);
    expect(mockRes.locals.stream._id).toEqual(stream._id);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
