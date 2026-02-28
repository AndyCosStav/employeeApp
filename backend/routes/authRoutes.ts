import express, {Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

const router = express.Router();

type RegisterBody = {
  email?: string
  password?: string
  role?: string
}

type LoginBody = { 
  email?: string
  password?: string
}


router.post('/auth/register', async (req: Request<{},{}, RegisterBody>, res:Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash,
      role: role || 'admin',
    });

    return res.status(201).json({
      success: true,
      message: 'User registered',
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: err.message,
    });
  }
});

router.post('/auth/login', async (req: Request<{},{}, LoginBody>, res:Response) => {
  try {
    const { email, password } = req.body;

    if(!email){
      throw new Error('Validation Error - email cannot be empty')
    }

        if(!password){
      throw new Error('Validation Error - password cannot be empty')
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }


      const jwtSecret = process.env.JWT_SECRET

      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined')
      }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
        issuer: 'employee-api',
        audience: 'employee-client',
      }
    );

    return res.json({
      success: true,
      accessToken: token,
    });
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err.message,
    });
  }
});

export default router;