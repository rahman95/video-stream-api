const userController = require('./../../../src/controllers/userController');

describe('UserController', () => {
  test('returns an object', () => {
    expect(typeof userController).toBe('object');
  });
  test('has a create method', () => {
    expect(userController).toHaveProperty('create');
    expect(typeof userController.create).toBe('function');
  });
  test('has a show method', () => {
    expect(userController).toHaveProperty('show');
    expect(typeof userController.show).toBe('function');
  });
});
