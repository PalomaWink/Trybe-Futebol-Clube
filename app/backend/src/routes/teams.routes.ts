import { Router, Request, Response } from 'express';
import TeamsController from '../controller/teams.controller';

const router = Router();
const teamsController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default router;
