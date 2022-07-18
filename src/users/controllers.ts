import { RequestHandler } from 'express';

import usersService from './services';

const createUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.create({ email, password });

  return res.status(201).json({ id: user.id });
};

export default {
  createUser,
};
