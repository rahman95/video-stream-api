const streamController = require('./../../../src/controllers/streamController');

describe('StreamController', () => {
  test('returns an object', () => {
    expect(typeof streamController).toBe('object');
  });
  test('has a create method', () => {
    expect(streamController).toHaveProperty('create');
    expect(typeof streamController.create).toBe('function');
  });
  test('has a persist method', () => {
    expect(streamController).toHaveProperty('persist');
    expect(typeof streamController.persist).toBe('function');
  });
  test('has a destroy method', () => {
    expect(streamController).toHaveProperty('destroy');
    expect(typeof streamController.destroy).toBe('function');
  });
});
