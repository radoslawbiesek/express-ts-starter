import { RequestHandler } from 'express';

import authService from './services';

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.validate({ email, password });

  if (token) {
    return res.status(200).json({ token });
  }

  return res.status(401).send('Invalid credentials');
};

export default {
  login,
};
