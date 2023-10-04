import { Router, Request, Response } from 'express';
import UsersController from '../controller/users.controller';
import Validations from '../middleware/Validations';

const router = Router();
const usersController = new UsersController();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);
router.get(
  '/role',
  Validations.validateRegister,
  (req: Request, res: Response) =>
    UsersController.getRole(req, res),
);

export default router;
