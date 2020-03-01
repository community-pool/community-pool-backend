const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/hello-world', require('./routes/hello-world'));
app.use('/api/v1/posts', require('./routes/posts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

export { app };
