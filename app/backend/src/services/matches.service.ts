import { ModelStatic } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import sequelize from '../database/models/index';
import Teams from '../database/models/Teams.Model';
import inProgressQuery from '../utils/querySQL';
import queryType from '../Interfaces/Query';
import { createMatch } from '../Interfaces/CreateMatch';

export default class MatchesService {
  constructor(
    private _matchesModel: ModelStatic<Matches> = Matches,
    private _sequelize = sequelize,
  ) {}

  public async getMatchById(id: string) {
    const match = await this._matchesModel.findByPk(id, {
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return match;
  }

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

  public async updateMatchInProgress(id: string) {
    const match = await this.getMatchById(id);
    if (!match) return { status: 404, data: { message: 'Match not found' } };
    if (!match.inProgress) return { status: 409, data: { message: 'Match already finished' } };
    match.inProgress = false;
    await match.save();
    return { status: 200, data: { message: 'Finished' } };
  }

  public async setMatchPointsResult(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.getMatchById(id);
    if (!match) return { status: 404, data: { message: 'Match not found' } };
    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;
    await match.save();
    return { status: 200, data: match };
  }

  public async createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: createMatch) {
    const createNewMatch = await this._matchesModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return { status: 201, data: createNewMatch };
  }
}
