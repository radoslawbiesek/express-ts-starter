import { ErrorRequestHandler } from 'express';

import HttpError from './HttpError';

const errorHandler: ErrorRequestHandler = async (
  error: HttpError | Error,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  console.log(error)
  const statusCode = error instanceof HttpError ? error.statusCode : 500;

  res.status(statusCode).json({ message: error.message });
};

export default errorHandler;
