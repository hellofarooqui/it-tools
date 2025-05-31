import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { userLogin, userProfile, userRegister } from '../controllers/authoController.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register
router.post('/register', userRegister);

// Login
router.post('/login', userLogin);

// Get Authenticated User
router.get('/me', userProfile);

export default router;
