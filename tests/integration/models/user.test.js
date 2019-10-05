const dayjs = require('dayjs');
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

  describe('removeExpiredStreams method', () => {
    test('removes all expired streams', async () => {
      const validDate = dayjs();
      const invalidDate = dayjs().subtract(1, 'hour');

      const stream1 = await streamModel.create({ updatedAt: validDate }); // Valid
      const stream2 = await streamModel.create({ updatedAt: invalidDate }); // Invalid - to be removed
      const stream3 = await streamModel.create({ updatedAt: validDate }); // Valid

      const user = await userModel.create({
        token: 'abc1233',
        streams: [stream1._id, stream2._id, stream3._id],
      });
      expect(user.streams.length).toBe(3);

      const updatedUser = await user.removeExpiredStreams();
      expect(updatedUser.streams.length).toBe(2);
    });
    test('works if no streams', async () => {
      const user = await userModel.create({ token: 'abc1233' });
      const updatedUser = await user.removeExpiredStreams();

      expect(user).toMatchObject(updatedUser);
    });
  });

  describe('canStream method', () => {
    test('returns true if below limit', async () => {
      const date = dayjs();
      const stream1 = await streamModel.create({ updatedAt: date });
      const stream2 = await streamModel.create({ updatedAt: date });

      const user = await userModel.create({
        token: 'abc1233',
        streams: [stream1._id, stream2._id],
      });

      expect(user.canStream()).toBeTruthy();
    });
    test('returns false if limit or above', async () => {
      const date = dayjs();
      const stream1 = await streamModel.create({ updatedAt: date });
      const stream2 = await streamModel.create({ updatedAt: date });
      const stream3 = await streamModel.create({ updatedAt: date });
      const stream4 = await streamModel.create({ updatedAt: date });

      const user1 = await userModel.create({
        token: 'abc1233',
        streams: [stream1._id, stream2._id, stream3._id],
      });

      const user2 = await userModel.create({
        token: 'abc1233',
        streams: [stream1._id, stream2._id, stream3._id, stream4._id],
      });

      expect(user1.canStream()).toBeFalsy();
      expect(user2.canStream()).toBeFalsy();
    });
  });
});
