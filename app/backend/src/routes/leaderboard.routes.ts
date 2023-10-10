import { Router, Request, Response } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res),
);
router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayLeaderboard(req, res),
);

export default router;
