import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './auth/routes';
import errorHandler from './utils/errors/error-handler';
import { authenticate } from './auth/middlewares';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/auth', authRoutes);
app.use(authenticate);
app.get('/hello', (req, res) => {
  res.status(200).send('Hello world!');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
