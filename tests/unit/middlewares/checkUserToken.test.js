const checkUserToken = require('./../../../src/middlewares/checkUserToken');

describe('CheckUserToken Middleware', () => {
  test('returns a function', () => {
    expect(typeof checkUserToken).toBe('function');
  });
});
