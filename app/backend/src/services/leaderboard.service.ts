import TeamRanking from '../Interfaces/Leaderboard/Leaderboard';
import { leaderboardQuery } from '../utils/querySQL';
import sequelize from '../database/models/index';

export default class LeaderboardService {
  constructor(
    private _sequelize = sequelize,
  ) {}

  public async getLeaderboard() {
    const [query] = await this._sequelize.query(leaderboardQuery) as unknown as TeamRanking[];
    return { status: 200, data: query };
  }
}
