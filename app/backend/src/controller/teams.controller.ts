import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(
    private _teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._teamsService.getAllTeams();
    return res.status(status).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this._teamsService.getTeamById(id);
    return res.status(status).json(data);
  }
}

export default TeamsController;
