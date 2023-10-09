import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';
import Validations from '../middleware/Validations';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get(
  '/home',
  Validations.validateRegister,
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default router;
