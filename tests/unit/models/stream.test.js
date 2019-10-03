const mongoose = require('mongoose');
const streamModel = require('./../../../src/models/stream');

describe('streamModel', () => {
  test('returns an instance of mongoose.Schema', () => {
    expect(streamModel.schema).toBeInstanceOf(mongoose.Schema);
  });

  describe('UpdatedAt Property', () => {
    test('schema contains updatedAt property', () => {
      expect(streamModel.schema.obj).toHaveProperty('updatedAt');
    });

    test('property is set to be of Date String', () => {
      expect(streamModel.schema.paths.updatedAt).toBeInstanceOf(
        mongoose.SchemaTypes.Date,
      );
    });
  });

  describe('CreatedAt Property', () => {
    test('schema contains createdAt property', () => {
      expect(streamModel.schema.obj).toHaveProperty('createdAt');
    });

    test('property is set to be of Date String', () => {
      expect(streamModel.schema.paths.createdAt).toBeInstanceOf(
        mongoose.SchemaTypes.Date,
      );
    });
  });
});
