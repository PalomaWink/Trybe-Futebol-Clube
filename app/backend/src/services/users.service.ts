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
      return { status: 400, data: { message: 'All fields must be filled' } };
    }
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign({
      id: users.id,
      name: users.username,
    }, process.env.JWT_SECRET || 'padrao');
    return { status: 200, data: { token } };
  }
}
