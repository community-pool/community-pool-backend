const { Router } = require('express');
import Post from '../models/Post';

module.exports = Router().post('/', (req, res, next) => {
  const { userName, title, content } = req.body;
  Post.create({ userName, title, content }).then(post => res.send(post));
});
