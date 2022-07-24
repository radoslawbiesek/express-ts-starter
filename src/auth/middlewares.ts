import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import { TokenPayload } from './models';
import HttpError from '../utils/errors/HttpError';
import config from '../config';

const authenticate: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split('Bearer ')[1];
    const decodedToken =
      token && (jwt.verify(token, config.jwt.secret) as TokenPayload);

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
