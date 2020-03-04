import { Router, NextFunction, Request, Response } from 'express';
import Post from '../models/Post';
import { ResponseError } from '../interfaces/response-error';

module.exports = Router()
  .get('/', (req: Request, res: Response, next: NextFunction) => {
    Post.find()
      .then(posts => res.send(posts))
      .catch(next);
  })
  .get('/:id', (req: Request, res: Response, next: NextFunction) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          let err: ResponseError = new Error('Not Found');
          err.status = 404;
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
  .delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    Post.findByIdAndDelete(req.params.id)
      .then(post => {
        if (!post) {
          let err: ResponseError = new Error('Not Found');
          err.status = 404;
          throw err;
        }
        res.send(post);
      })
      .catch(next);
  })
  .put('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      { title, content },
      { new: true }
    )
      .then(post => {
        if (!post) {
          let err: ResponseError = new Error('Not Found');
          err.status = 404;
          throw err;
        }
        res.send(post);
      })
      .catch(next);
  });
