const dayjs = require('dayjs');
const streamModel = require('./../../../src/models/stream');
const { createServer, destroyServer } = require('./../../utils/mongoHelper');
const { isTodaysDate } = require('./../../utils/dateHelper');

beforeEach(async () => {
  await createServer();
});

afterEach(async () => {
  await destroyServer();
});

describe('Stream Model', () => {
  test('a new entry can be added', async () => {
    const currentCount = await streamModel.countDocuments().exec();
    await streamModel.create({});
    const newCount = await streamModel.countDocuments().exec();

    expect(currentCount).toBe(0);
    expect(newCount).toBe(1);
  });

  test('a new entry is added with correct values', async () => {
    const date = dayjs();
    const newStream = await streamModel.create({ updatedAt: date });
    const updatedAt = dayjs(newStream.updatedAt);

    expect(updatedAt).toEqual(date);
  });

  test('a new entry has createdAt set by default as today', async () => {
    const newStream = await streamModel.create({ updatedAt: Date.now() });
    const date = dayjs(newStream.createdAt);

    expect(newStream).toHaveProperty('createdAt');
    expect(isTodaysDate(date)).toBeTruthy();
  });

  describe('isValid method', () => {
    test('returns true when valid stream passed', async () => {
      // set updatedAt as now, so should be valid
      const date1 = new dayjs();
      const stream1 = await streamModel.create({ updatedAt: date1 });
      const stream1UpdatedAt = dayjs(stream1.updatedAt);

      expect(stream1UpdatedAt).toEqual(date1);
      expect(stream1.isValid()).toBeTruthy();

      // set updatedAt as now + 30 seconds, so should be valid as within 90 seconds rule
      const date2 = new dayjs().add(30, 'seconds');
      const stream2 = await streamModel.create({ updatedAt: date2 });
      const stream2UpdatedAt = dayjs(stream2.updatedAt);

      expect(stream2UpdatedAt).toEqual(date2);
      expect(stream2.isValid()).toBeTruthy();
    });

    test('returns false when expired stream passed', async () => {
      // set updatedAt as now - 1 hour, so should be invalid as passed 90 seconds rule
      const date1 = dayjs().subtract(1, 'hour');
      const stream1 = await streamModel.create({ updatedAt: date1 });
      const stream1UpdatedAt = dayjs(stream1.updatedAt);

      expect(stream1UpdatedAt).toEqual(date1);
      expect(stream1.isValid()).toBeFalsy();

      // set updatedAt as now - 90 seconds, so should be invalid as is after 90 seconds rule
      const date2 = dayjs().subtract(90, 'seconds');
      const stream2 = await streamModel.create({ updatedAt: date2 });
      const stream2UpdatedAt = dayjs(stream2.updatedAt);

      expect(stream2UpdatedAt).toEqual(date2);
      expect(stream2.isValid()).toBeFalsy();
    });
  });

  describe('keepAlive method', () => {
    test('method updates updatedAt property', async () => {
      const date = dayjs();
      const newStream = await streamModel.create({ updatedAt: date });
      const currentUpdatedAt = dayjs(newStream.updatedAt);

      const updatedStream = await newStream.keepAlive();
      const newUpdatedAt = dayjs(updatedStream.updatedAt);

      expect(currentUpdatedAt).toEqual(date);
      expect(newUpdatedAt).not.toEqual(currentUpdatedAt);
      expect(newUpdatedAt.isAfter(currentUpdatedAt)).toBeTruthy();
    });
  });
});
