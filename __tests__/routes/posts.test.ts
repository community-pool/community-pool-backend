require('dotenv').config();

import * as request from 'supertest';
import { app } from '../../lib/app';
import { connect } from '../../lib/utils/connect';
import * as mongoose from 'mongoose';
import { createPosts } from '../helpers/create-posts';

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

    it('Returns a new posts', () => {
      return request(app)
        .post('/api/v1/posts')
        .send({ userName: 'jack', content: 'testConent' })
        .then(res => {
          expect(res.body).toEqual({
            status: 400,
            message: 'Post validation failed: title: Path `title` is required.'
          });
        });
    });

    it('Returns a list of posts', async () => {
      const posts = await createPosts();
      return request(app)
        .get('/api/v1/posts')
        .then(res => {
          expect(res.body).toHaveLength(3);
          expect(res.body[0]).toEqual({
            _id: expect.any(String),
            userName: posts[0].userName,
            title: posts[0].title,
            content: posts[0].content
          });
        });
    });

    it('returns a specific post', async () => {
      const posts = await createPosts();
      return request(app)
        .get(`/api/v1/posts/${posts[2]._id}`)
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            userName: posts[2].userName,
            title: posts[2].title,
            content: posts[2].content
          });
        });
    });
  });
});
