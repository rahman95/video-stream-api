const mongoose = require('mongoose');
const userModel = require('./../../../src/models/user');

describe('userModel', () => {
  test('returns an instance of mongoose.Schema', () => {
    expect(userModel.schema).toBeInstanceOf(mongoose.Schema);
  });

  describe('Email Property', () => {
    test('contains email property', () => {
      expect(userModel.schema.obj).toHaveProperty('email');
    });

    test('property is set to be of type String', () => {
      expect(userModel.schema.paths.email).toBeInstanceOf(
        mongoose.SchemaTypes.String,
      );
    });

    test('property is set to be required', () => {
      expect(userModel.schema.obj.email.required).toBeTruthy();
    });

    test('property is set to be unique', () => {
      expect(userModel.schema.obj.email.unique).toBeTruthy();
    });

    test('property is set to be trimed', () => {
      expect(userModel.schema.obj.email.trim).toBeTruthy();
    });

    test('property is set to be lowercased', () => {
      expect(userModel.schema.obj.email.lowercase).toBeTruthy();
    });
  });

  describe('Token Property', () => {
    test('contains token property', () => {
      expect(userModel.schema.obj).toHaveProperty('token');
    });

    test('property is set to be of type String', () => {
      expect(userModel.schema.paths.token).toBeInstanceOf(
        mongoose.SchemaTypes.String,
      );
    });

    test('property is set to be required', () => {
      expect(userModel.schema.obj.token.required).toBeTruthy();
    });

    test('property is set to be trimed', () => {
      expect(userModel.schema.obj.token.trim).toBeTruthy();
    });
  });

  describe('Streams Property', () => {
    test('contains streams property', () => {
      expect(userModel.schema.obj).toHaveProperty('streams');
    });

    test('property is set to be of type String', () => {
      expect(userModel.schema.paths.streams).toBeInstanceOf(
        mongoose.SchemaTypes.Array,
      );
    });
  });

  describe('CreatedAt Property', () => {
    test('schema contains createdAt property', () => {
      expect(userModel.schema.obj).toHaveProperty('createdAt');
    });

    test('property is set to be of Date String', () => {
      expect(userModel.schema.paths.createdAt).toBeInstanceOf(
        mongoose.SchemaTypes.Date,
      );
    });
  });

  describe('Virtuals', () => {
    test('contains streamCount', () => {
      expect(userModel.schema.virtuals).toHaveProperty('streamCount');
    });
  });
});
