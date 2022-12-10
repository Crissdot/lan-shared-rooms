import express from 'express';
import bcrypt from 'bcrypt';
import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';
import { TypedRequest } from '../types/TypedRequest';
import { LoginSchema, LoginType } from '../schemas/auth';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';

const router = express.Router();
const UserModel = getUserModel(sequelize);

router.post('/login',
  validate(LoginSchema, 'body'),
  async (req: TypedRequest<LoginType>, res, next) => {
    const data: LoginType = req.body;

    const user = await UserModel.findOne({where: { username: data.username }});
    if (!user) return next(new Error('User not found'));

    const isSamePassword = await bcrypt.compare(data.password, user.getDataValue('password'));
    if (!isSamePassword) return next(new Error('Unauthorized'));

    const resData = successResponseData({
      code: 201,
      message: 'Login successfully',
      data: user,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
