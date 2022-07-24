import { Router } from 'express';

import authControllers from './controllers';
import checkValidation from '../utils/errors/check-validation';
import { loginValidators, registerValidators } from './validators';

const router = Router();

// /auth
router.post('/login', loginValidators, checkValidation, authControllers.login);
router.post(
  '/register',
  registerValidators,
  checkValidation,
  authControllers.register
);

export default router;
