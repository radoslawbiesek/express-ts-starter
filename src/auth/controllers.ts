import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../prisma/client';
import HttpError from '../utils/errors/HttpError';

import { userRegisterData, userLoginData, TokenPayload } from './models';

const findUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as userLoginData;

  const user = await findUser(email);
  const isValid = user && (await bcrypt.compare(password, user.password));

  if (!isValid) {
    return next(
      new HttpError(401, 'No active account found with the given credentials.')
    );
  }
  const payload: TokenPayload = { email, userId: user.id };

  const token = jwt.sign(payload, process.env.SECRET as string, {
    expiresIn: '2h',
  });

  return res.status(200).json({ token });
};

const register: RequestHandler = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body as userRegisterData;

  if (!email) {
    return next(new HttpError(400, 'No email was given.'));
  }

  const existingUser = await findUser(email);

  if (existingUser) {
    return next(
      new HttpError(400, 'User with given email address already exists.')
    );
  }

  if (password !== confirmPassword) {
    return next(new HttpError(400, 'Passwords do not match.'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ userId: user.id });
};

export default {
  login,
  register,
};
