import { RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class Validations {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const validation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validation.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static validateRegister: RequestHandler = (req, res, next): Response | void => {
    const secret = process.env.JWT_SECRET || 'padrao';
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const [, token] = authorization.split(' ');
    try {
      req.body.token = jwt.verify(token, secret);
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default Validations;
