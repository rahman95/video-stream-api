const checkUserCanStream = require('./../../../src/middlewares/checkUserCanStream');

describe('CheckUserCanStream Middleware', () => {
  test('returns a function', () => {
    expect(typeof checkUserCanStream).toBe('function');
  });
});
