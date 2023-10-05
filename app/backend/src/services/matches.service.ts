import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import sequelize from '../database/models/index';
import Teams from '../database/models/Teams.Model';

export default class MatchesService {
  constructor(
    private _matchesModel: ModelStatic<Matches> = Matches,
    private _sequelize = sequelize,
  ) {}

  public async getAllMatches(inProgress: string) {
    const queryTrue = await this._sequelize
      .query('SELECT * FROM matches WHERE in_progress = TRUE');
    const queryFalse = await this._sequelize
      .query('SELECT * FROM matches WHERE in_progress = FALSE');
    if (inProgress === 'true') {
      return { status: 200, data: queryTrue };
    } if (inProgress === 'false') {
      return { status: 200, data: queryFalse };
    }
    const allMatches = await this._matchesModel.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, data: allMatches };
  }
}
