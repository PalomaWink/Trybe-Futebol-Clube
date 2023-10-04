import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(
    private _matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._matchesService.getAllMatches();
    return res.status(status).json(data);
  }
}
