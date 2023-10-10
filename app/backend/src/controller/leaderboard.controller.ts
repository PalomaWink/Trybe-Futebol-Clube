import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private _leaderboardService = new LeaderboardService(),
  ) {

  }

  public async getAllLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._leaderboardService.getAllLeaderboard();
    return res.status(status).json(data);
  }

  public async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._leaderboardService.getHomeLeaderboard();
    return res.status(status).json(data);
  }

  public async getAwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this._leaderboardService.getAwayLeaderboard();
    return res.status(status).json(data);
  }
}
