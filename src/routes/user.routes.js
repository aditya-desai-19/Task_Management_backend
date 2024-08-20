import express from 'express';
import { authenticateUser, registerUser } from '../controllers/user.controllers';
const userRouter = express.Router();

userRouter.get('/', authenticateUser);
userRouter.post('/', registerUser);

export default userRouter;
