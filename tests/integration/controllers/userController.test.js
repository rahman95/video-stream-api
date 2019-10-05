const userController = require('./../../../src/controllers/userController');
const userModel = require('./../../../src/models/user');
const { mockRequest, mockResponse } = require('./../../utils/expressHelper');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const { createToken } = require('./../../../src/utils/helpers');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('User Controller', () => {
  test('create method returns success response and token', async () => {
    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await userController.create(mockReq, mockRes);
    const { token } = await userModel.findOne().exec();

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ token });
  });

  test('show method returns success with valid token', async () => {
    const userData = { token: createToken() };
    const user = await userModel.create(userData);

    const mockReq = mockRequest(userData);
    const mockRes = mockResponse();

    // Attach user on to locals like the previous middleware would
    mockRes.locals.user = user;

    await userController.show(mockReq, mockRes);

    // Mongoose returns weird wrapped object so need to call toObject to get raw object
    const { streamCount, streams } = user.toObject();
    const expectedResponse = {
      streamCount,
      streams,
    };

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
  });
});
