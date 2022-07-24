import { Router } from 'express';

import authControllers from './controllers';

const router = Router();

// /auth
router.post('/login', authControllers.login);
router.post('/register', authControllers.register);

export default router;
