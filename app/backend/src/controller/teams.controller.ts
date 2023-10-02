import TeamsService from '../services/teams.service';
import { ServiceResponse } from '../Interfaces/serviceResponse';
import ITeams from '../Interfaces/Teams/Teams';

export default class TeamsController {
  constructor(
    private _teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<ServiceResponse<ITeams[]>> {
    const { status, data } = await this._teamsService.getAllTeams();
    return res.status(status).json(data);
  }
}
