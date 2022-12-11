import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';

const UserModel = getUserModel(sequelize);

const getUserFromToken = async (token?: string) => {
  if (!token) {
    return null;
  }

  const user = await UserModel.findOne({where: { token }});
  return user;
}

export { getUserFromToken };
