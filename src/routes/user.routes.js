import express from 'express';
import { authenticateUser, registerUser, authenticateGoogleUser } from '../controllers/user.controllers.js';
const userRouter = express.Router();

userRouter.post('/login', authenticateUser);
userRouter.post('/signup', registerUser);
userRouter.post('/google-auth', authenticateGoogleUser);

export default userRouter;
