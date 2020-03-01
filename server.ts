require('dotenv').config();
import { connect } from './lib/utils/connect';
connect();

import { app } from './lib/app';

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
