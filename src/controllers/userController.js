import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRegister } from '../services/user.js';

export const register = async (req, res) => {
  try {
    console.log("route hit",req.body);
    const saveUser = await userRegister(req.body);
console.log("save",saveUser)
    return res.status(201).json({
        message: 'user registered successfully',
        saveUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};