const { Router } = require('express');
import Post from '../models/Post';
import { toEditorSettings } from 'typescript';

module.exports = Router()
  .get('/', (req, res, next) => {
    Post.find()
      .then(posts => res.send(posts))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          let err = new Error('Not Found');
          err['status'] = 404;
          throw err;
        }
        res.send(post);
      })
      .catch(next);
  })
  .post('/', (req, res, next) => {
    const { userName, title, content } = req.body;
    Post.create({ userName, title, content })
      .then(post => res.send(post))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
      .then(post => {
        if (!post) {
          let err = new Error('Not Found');
          err['status'] = 404;
          throw err;
        }
        res.send(post);
      })
      .catch(next);
  });
