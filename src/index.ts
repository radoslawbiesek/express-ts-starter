import express from 'express';

import authRoutes from './auth/routes';
import errorHandler from './utils/errors/error-handler';
import { authenticate } from './auth/middlewares';
import config from './config';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use(authenticate);
app.get('/hello', (req, res) => {
  res.status(200).send('Hello world!');
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running at https://localhost:${config.port}`);
});
