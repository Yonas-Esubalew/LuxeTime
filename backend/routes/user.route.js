import router from 'express';

import { SignupController } from '../controllers/UserController';
import { verifyAccessToken } from '../middleware/auth0';

const UserRouter = router.Router();

UserRouter.post('/api/auth0/signup', verifyAccessToken,  SignupController);
