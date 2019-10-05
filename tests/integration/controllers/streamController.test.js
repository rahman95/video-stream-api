const dayjs = require('dayjs');
const streamController = require('./../../../src/controllers/streamController');
const userModel = require('./../../../src/models/user');
const streamModel = require('./../../../src/models/stream');
const { mockRequest, mockResponse } = require('./../../utils/expressHelper');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('Stream Controller', () => {
  test('create method returns success response and stream identifer', async () => {
    const user = await userModel.create({ token: 'abc123' });

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    mockRes.locals.user = user;

    await streamController.create(mockReq, mockRes);

    //new stream instance should've been created
    const { _id } = await streamModel.findOne().exec();

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ stream: _id });
  });

  test('persist method returns success with valid stream', async () => {
    const stream = await streamModel.create({});

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    mockRes.locals.stream = stream;

    await streamController.persist(mockReq, mockRes);

    // get fresh instance of document
    const newStream = await streamModel.findById(stream._id).exec();

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(dayjs(stream.updatedAt)).not.toEqual(dayjs(newStream.updatedAt));
    expect(
      dayjs(newStream.updatedAt).isAfter(dayjs(stream.updatedAt)),
    ).toBeTruthy();
  });

  test('destroy method returns success and removes entry', async () => {
    const stream1 = await streamModel.create({}); //to be deleted
    const stream2 = await streamModel.create({});
    const user = await userModel.create({
      token: 'abc123',
      streams: [stream1._id, stream2._id],
    });

    expect(user.streamCount).toBe(2);

    const mockReq = mockRequest();
    const mockRes = mockResponse();
    mockRes.locals.stream = stream1;
    mockRes.locals.user = user;

    await streamController.destroy(mockReq, mockRes);

    // get fresh documents and expect changes
    const newUser = await userModel.findById(user._id).exec();
    const newStream = await streamModel.findById(stream1._id).exec(); //should be deleted

    expect(newUser.streamCount).toBe(1);
    expect(newStream).toBeFalsy();
    expect(mockRes.status).toHaveBeenCalledWith(204);
  });
});
