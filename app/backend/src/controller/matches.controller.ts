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
}
