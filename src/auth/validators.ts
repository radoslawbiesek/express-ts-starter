import { body } from 'express-validator';

const loginValidators = [
  body('email').trim().not().isEmpty().withMessage('Email adress is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email adress')
    .normalizeEmail(),
  body('password').trim().not().isEmpty().withMessage('Password is required'),
];

const registerValidators = [
  ...loginValidators,
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
];

export { loginValidators, registerValidators };
