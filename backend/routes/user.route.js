import router from 'express';

import { SignupController } from '../controllers/UserController.js';
import { verifyAccessToken } from '../middleware/auth0.js';

const UserRouter = router.Router();

UserRouter.post('/signup', verifyAccessToken,  SignupController);

export default UserRouter;
