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
    await streamModel.create({ updatedAt: Date.now() });
    const newCount = await streamModel.countDocuments().exec();

    expect(currentCount).toBe(0);
    expect(newCount).toBe(1);
  });

  test('a new entry is added with correct values', async () => {
    const date = new Date();
    const newStream = await streamModel.create({ updatedAt: date });

    expect(newStream.updatedAt).toEqual(date);
  });

  test('a new entry has createdAt set by default as today', async () => {
    const newStream = await streamModel.create({ updatedAt: Date.now() });
    const date = new Date(newStream.createdAt);

    expect(newStream).toHaveProperty('createdAt');
    expect(isTodaysDate(date)).toBeTruthy();
  });
});
