const checkUserToken = require('./../../../src/middlewares/checkUserToken');
const userModel = require('./../../../src/models/user');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const { createToken } = require('./../../../src/utils/helpers');
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
  test('check method throws error when no token passed', async () => {
    const mockReq = mockRequest({});
    const mockRes = mockResponse();

    await checkUserToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('Error - No token passed');
  });

  test('check method throws error when token not found', async () => {
    const mockReq = mockRequest({ token: 'abc123' });
    const mockRes = mockResponse();

    await checkUserToken(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Error - Not Found');
  });

  test('check method attaches user to response and passes forwards if valid token', async () => {
    const userData = { token: createToken() };
    const user = await userModel.create(userData);

    const mockReq = mockRequest(userData);
    const mockRes = mockResponse();

    await checkUserToken(mockReq, mockRes, mockNext);

    expect(mockRes.locals).toHaveProperty('user');
    expect(mockRes.locals.user).toBeInstanceOf(userModel);
    expect(mockRes.locals.user._id).toEqual(user._id);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
