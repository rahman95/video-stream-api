const checkStreamIdentifier = require('../../../src/middlewares/checkStreamIdentifier');

describe('CheckStreamIdentifier Middleware', () => {
  test('returns a function', () => {
    expect(typeof checkStreamIdentifier).toBe('function');
  });
});
