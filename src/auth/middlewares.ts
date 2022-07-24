import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import { TokenPayload } from './models';
import HttpError from '../utils/errors/HttpError';

const authenticate: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split('Bearer ')[1];
    const decodedToken =
      token &&
      (jwt.verify(token, process.env.SECRET as string) as TokenPayload);

    if (!decodedToken) {
      return next(new HttpError(401, 'Not authenticated.'));
    }

    // req.userId = decodedToken.userId;

    return next();
  } catch (error) {
    return next(new HttpError(401, 'Not authenticated.'));
  }
};

export { authenticate };
