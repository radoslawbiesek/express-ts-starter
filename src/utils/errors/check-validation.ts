import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const checkValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();

    const formattedErrors = Object.values(mappedErrors).reduce(
      (acc, item) => ({ ...acc, [item.param]: item.msg }),
      {}
    );
    return res.status(400).json({
      errors: formattedErrors,
    });
  }

  return next();
};

export default checkValidation;
