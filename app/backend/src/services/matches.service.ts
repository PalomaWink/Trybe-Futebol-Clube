import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import Teams from '../database/models/Teams.Model';

export default class MatchesService {
  constructor(
    private _matchesModel: ModelStatic<Matches> = Matches,
  ) {}

  public async getAllMatches(): Promise<{ status: number, data: Matches[] }> {
    const matches = await this._matchesModel.findAll(
      {
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return { status: 200, data: matches };
  }
}
