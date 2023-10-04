import { Router, Request, Response } from 'express';
import MatchesController from '../controller/matches.controller';
import Validations from '../middleware/Validations';

const router = Router();
const matchesController = new MatchesController();

router.get(
  '/',
  Validations.validateRegister,
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);
// router.get('/:id', (req: Request, res: Response) => matchesController.getTeamById(req, res));

export default router;
