import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams.Model';
import ITeams from '../Interfaces/Teams/Teams';

class TeamsService {
  constructor(
    private teamsModel: ModelStatic<Teams> = Teams,
  ) {}

  public async getAllTeams(): Promise<{ status: number, data: ITeams[] }> {
    const teams = await this.teamsModel.findAll();
    return { status: 200, data: teams };
  }

  public async getTeamById(id: string) {
    const team = await this.teamsModel.findByPk(id);
    return { status: 200, data: team };
  }
}

export default TeamsService;
