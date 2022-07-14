import { Router } from 'express';

import authControllers from './controllers';

const router = Router();

router.post('/auth/login/', authControllers.login);
router.post('/auth/register', authControllers.register);

export default router;
