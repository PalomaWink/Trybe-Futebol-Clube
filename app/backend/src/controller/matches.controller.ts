import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const { status, data } = await this._matchesService.getAllMatches(inProgress as string);
    return res.status(status).json(data);
  }

  public async updateMatchInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this._matchesService.updateMatchInProgress(id);
    return res.status(status).json(data);
  }

  public async setMatchPointsResult(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this._matchesService
      .setMatchPointsResult(id, homeTeamGoals, awayTeamGoals);
    return res.status(status).json(data);
  }
}
