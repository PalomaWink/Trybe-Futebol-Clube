import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/Users.Model';
import { ServiceResponse } from '../Interfaces/serviceResponse';

export default class UsersService {
  constructor(
    private _usersModel: ModelStatic<Users> = Users,
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const users = await this._usersModel.findOne({ where: { email } });
    if (!users) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign({
      email: users.email,
      role: users.role,
    }, process.env.JWT_SECRET || 'padrao', { algorithm: 'HS256', expiresIn: '7d' });
    return { status: 200, data: { token } };
  }

  public async getRole(authorization: string): Promise<ServiceResponse<{ role: string }>> {
    const [, token] = authorization.split(' ');
    jwt.verify(token, process.env.JWT_SECRET);
    const users = await this._usersModel.findOne({ where: { id } });
    if (!users) {
      return { status: 401, data: { message: 'Token must be a valid token' } };
    }
    return { status: 200, data: { role: users.role } };
  }
}
