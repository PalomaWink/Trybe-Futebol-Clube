import { Router } from 'express';
import teams from './teams.routes';
import users from './users.routes';
import matches from './matches.routes';
import leaderboard from './leaderboard.routes';

const router = Router();
router.use('/teams', teams);
router.use('/login', users);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
