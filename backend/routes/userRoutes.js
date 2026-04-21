import express from 'express';
import { adminlogin } from '../controller/userController.js';
import { loginLimiter } from '../middleware/rateLimitMiddleware.js';

const userrouter = express.Router();

userrouter.post('/admin', loginLimiter, adminlogin);

export default userrouter;