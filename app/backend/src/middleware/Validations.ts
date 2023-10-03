import { RequestHandler, Response } from 'express';

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
}

export default Validations;
