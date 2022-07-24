import dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.PORT) || 8000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  },
};
