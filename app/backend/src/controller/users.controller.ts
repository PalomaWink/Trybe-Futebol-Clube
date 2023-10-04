import { Request, Response } from 'express';
import UsersService from '../services/users.service';

export default class UsersController {
  constructor(
    private _usersService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const { status, data } = await this._usersService.login(email, password);
    return res.status(status).json(data);
  }

  public static async getRole(req: Request, res: Response): Promise<Response> {
    const { token } = req.body;
    return res.status(200).json({ role: token.role });
  }
}
