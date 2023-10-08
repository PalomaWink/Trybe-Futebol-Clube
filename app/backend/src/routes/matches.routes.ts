import { Router, Request, Response } from 'express';
import MatchesController from '../controller/matches.controller';
import Validations from '../middleware/Validations';

const router = Router();
const matchesController = new MatchesController();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);
router.patch(
  '/:id',
  Validations.validateRegister,
  (req: Request, res: Response) => matchesController.setMatchPointsResult(req, res),
);
router.patch(
  '/:id/finish',
  Validations.validateRegister,
  (req: Request, res: Response) => matchesController.updateMatchInProgress(req, res),
);
router.post(
  '/',
  Validations.validateRegister,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
