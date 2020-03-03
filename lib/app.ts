const express = require('express');
const app = express();
// import * as cors from 'cors';
const cors = require('cors');
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use('/api/v1/posts', require('./routes/posts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

export { app };
