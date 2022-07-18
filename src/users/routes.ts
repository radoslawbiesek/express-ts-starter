import { Router } from 'express';

import usersControllers from './controllers';

const router = Router();

router.post('/users/', usersControllers.createUser);

export default router;
