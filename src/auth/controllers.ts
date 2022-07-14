import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../prisma/client';

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isValid = user ? await bcrypt.compare(password, user.password) : false;

  if (!user || !isValid) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign(
    { email, userId: user.id },
    process.env.SECRET as string,
    { expiresIn: '8h' }
  );

  return res.status(200).json({ token, userId: user.id });
};

const register: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(
    password,
    process.env.SALT_ROUNDS as string
  );

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return res.status(201).json({ id: user.id });
};

export default {
  login,
  register,
};
