import TeamRanking from '../Interfaces/Leaderboard/Leaderboard';
import { leaderboardQueryAllTeams,
  leaderboardQueryHomeTeams,
  leaderboardQueryAwayTeams } from '../utils/querySQL';
import sequelize from '../database/models/index';

export default class LeaderboardService {
  constructor(
    private _sequelize = sequelize,
  ) {}

  public async getAllLeaderboard() {
    const [query] = await this._sequelize
      .query(leaderboardQueryAllTeams) as unknown as TeamRanking[];
    return { status: 200, data: query };
  }

  public async getHomeLeaderboard() {
    const [query] = await this._sequelize
      .query(leaderboardQueryHomeTeams) as unknown as TeamRanking[];
    return { status: 200, data: query };
  }

  public async getAwayLeaderboard() {
    const [query] = await this._sequelize
      .query(leaderboardQueryAwayTeams) as unknown as TeamRanking[];
    return { status: 200, data: query };
  }
}
