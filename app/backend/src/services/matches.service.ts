import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import sequelize from '../database/models/index';
import Teams from '../database/models/Teams.Model';
import inProgressQuery from '../utils/querySQL';
import queryType from '../Interfaces/Query';

export default class MatchesService {
  constructor(
    private _matchesModel: ModelStatic<Matches> = Matches,
    private _sequelize = sequelize,
  ) {}

  public async getAllMatches(inProgress: string) {
    if (!inProgress) {
      const allMatches = await this._matchesModel.findAll({
        include: [
          { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
        ],
      });
      return { status: 200, data: allMatches };
    }
    const queryValue = Number(JSON.parse(inProgress));
    const [queryInProgress] = await this._sequelize
      .query(`${inProgressQuery} ${queryValue}`) as queryType[][];
    const queryMap = queryInProgress
      .map((dataValues) => ({ ...dataValues, inProgress: Boolean(dataValues.inProgress) }));
    return { status: 200, data: queryMap };
  }
}
