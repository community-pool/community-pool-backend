import { Router } from 'express';
import { runInContext } from 'vm';
const Count = require('../models/Count');

module.exports = Router().get('/', (req, res) => {
  Count.findOneAndUpdate(
    { routeName: 'hello-world' },
    { $inc: { count: 1 } }
  ).then(async route => {
    if (!route)
      route = await Count.create({ routeName: 'hello-world', count: 1 });
    res.send({ count: route.count, message: 'Hello World!' });
  });
});
