const userModel = require('./../../../src/models/user');
const streamModel = require('./../../../src/models/stream');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const { createToken } = require('./../../../src/utils/helpers');
const { isTodaysDate } = require('./../../utils/dateHelper');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('User Model', () => {
  test('a new entry can be added', async () => {
    const currentCount = await userModel.countDocuments().exec();
    await userModel.create({ token: 'abc123' });
    const newCount = await userModel.countDocuments().exec();

    expect(currentCount).toBe(0);
    expect(newCount).toBe(1);
  });

  test('a new entry is added with correct values', async () => {
    const userToken = createToken();
    const newUser = await userModel.create({ token: userToken });

    expect(newUser.token).toEqual(userToken);
  });

  test('a new entry has createdAt set by default as today', async () => {
    const newUser = await userModel.create({ token: 'abc123' });
    const date = new Date(newUser.createdAt);

    expect(newUser).toHaveProperty('createdAt');
    expect(isTodaysDate(date)).toBeTruthy();
  });

  test('a new entry can been created with a stream associated', async () => {
    //first create stream instance
    const newStream = await streamModel.create({});
    const newUser = await userModel.create({
      token: 'abc123',
      streams: newStream._id,
    });

    expect(newUser).toHaveProperty('streams');
    expect(newUser.streams[0]).toEqual(newStream._id);
  });

  test('a new entry can been created with multiple streams associated', async () => {
    const stream1 = await streamModel.create({});
    const stream2 = await streamModel.create({});
    const stream3 = await streamModel.create({});
    const newUser = await userModel.create({
      token: 'abc123',
      streams: [stream1._id, stream2._id, stream3._id],
    });

    expect(newUser).toHaveProperty('streams');
    expect(newUser.streams[0]).toEqual(stream1._id);
    expect(newUser.streams[1]).toEqual(stream2._id);
    expect(newUser.streams[2]).toEqual(stream3._id);
  });

  test('streamCount virtual property works as expected', async () => {
    const stream1 = await streamModel.create({});
    const stream2 = await streamModel.create({});
    const user1 = await userModel.create({
      token: 'abc123',
      streams: [stream1._id, stream2._id],
    });

    const stream3 = await streamModel.create({});
    const user2 = await userModel.create({
      token: 'def456',
      streams: [stream3._id],
    });

    expect(user1.streamCount).toEqual(2);
    expect(user2.streamCount).toEqual(1);
  });
});
