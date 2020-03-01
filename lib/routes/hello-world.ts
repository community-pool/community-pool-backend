import { Router } from 'express';

module.exports = Router().get('/', (req, res) => {
  res.send('Hello World!');
});
