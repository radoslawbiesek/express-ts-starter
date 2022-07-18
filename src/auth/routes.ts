import { Router } from 'express';

import authControllers from './controllers';

const router = Router();

router.post('/auth/login/', authControllers.login);

export default router;
