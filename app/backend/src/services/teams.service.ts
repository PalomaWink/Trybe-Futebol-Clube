import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams.Model';

export default class TeamsService {
  constructor(
    private teamsModel: ModelStatic<Teams> = Teams,
  ) {}

  public async getAllTeams() {
    const teams = await this.teamsModel.findAll();
    return { status: 200, data: teams };
  }
}
