import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';

const getUserFromToken = async (token?: string) => {
  if (!token) {
    return null;
  }

  const user = await getUserModel(sequelize).findOne({where: { token }});
  return user;
}

export { getUserFromToken };
