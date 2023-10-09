import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) {

  }

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this._leaderboardService.getLeaderboard();
    return res.status(200).json(leaderboard);
  }
}
