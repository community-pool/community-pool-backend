require('dotenv').config();

import * as request from 'supertest';
import { app } from '../../lib/app';
import { connect } from '../../lib/utils/connect';
import * as mongoose from 'mongoose';

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  describe('Hello world route', () => {
    it('Returns hello world', () => {
      return request(app)
        .get('/api/v1/hello-world')
        .then(res => {
          expect(res.body).toEqual({ count: 1, message: 'Hello World!' });
        });
    });
  });
});
