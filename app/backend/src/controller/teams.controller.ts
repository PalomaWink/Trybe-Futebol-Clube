import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(
    private _teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const { status, data } = await this._teamsService.getAllTeams();
    return res.status(status).json(data);
  }
}
