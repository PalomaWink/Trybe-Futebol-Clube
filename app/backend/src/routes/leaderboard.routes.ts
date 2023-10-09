import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default router;
