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

  describe('Posts routes', () => {
    it('Returns a new posts', () => {
      return request(app)
        .post('/api/v1/posts')
        .send({ userName: 'jack', title: 'testTitle', content: 'testConent' })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            userName: 'jack',
            title: 'testTitle',
            content: 'testConent'
          });
        });
    });
  });
});
