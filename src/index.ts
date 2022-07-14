import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './auth/routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
