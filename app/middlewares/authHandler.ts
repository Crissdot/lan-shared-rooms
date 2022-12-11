import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';

const UserModel = getUserModel(sequelize);

const tokenBasedAuth = async (req: Request, res: Response, next: NextFunction) => {
  const badTokenError = createError.Forbidden('You need to login first');

  const token = req.header('Token-Auth');
  if (!token) {
    return next(badTokenError);
  }

  const user = await UserModel.findOne({where: { token }});
  if (!user) {
    return next(badTokenError);
  }
  return next();
}

export { tokenBasedAuth };
