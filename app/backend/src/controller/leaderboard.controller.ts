import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) {

  }

  public async getLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._leaderboardService.getLeaderboard();
    return res.status(status).json(data);
  }
}
