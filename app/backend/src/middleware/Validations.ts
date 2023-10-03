import { RequestHandler, Response } from 'express';

class Validations {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}

export default Validations;
