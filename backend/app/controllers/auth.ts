import express from 'express';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';
import { TypedRequest } from '../types/TypedRequest';
import { LoginSchema, LoginType } from '../schemas/auth';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';
import { tokenBasedAuth } from '../middlewares/authHandler';
import { generateToken } from '../utils/tokenGenerator';

const router = express.Router();

router.post('/login',
  validate(LoginSchema, 'body'),
  async (req: TypedRequest<LoginType>, res, next) => {
    const data: LoginType = req.body;
    const wrongCredentialsError = createError.Unauthorized('Username or password incorrect');

    const user = await getUserModel(sequelize).findOne({where: { username: data.username }});
    if (!user) return next(wrongCredentialsError);

    const isSamePassword = await bcrypt.compare(data.password, user.getDataValue('password'));
    if (!isSamePassword) return next(wrongCredentialsError);

    const token = generateToken();
    await user.update({ token });

    const resData = successResponseData({
      message: 'Login successfully',
      data: {
        user,
      },
    });
    return res.status(resData.code).json(resData);
  }
);

router.post('/logout',
  tokenBasedAuth,
  async (req, res, next) => {
    const token = req.header('Token-Auth');
    const user = await getUserModel(sequelize).findOne({where: { token }});
    if (!user) {
      return next(createError.NotFound('User not found'));
    }

    await user.update({ token: null });

    const resData = successResponseData({
      message: 'Logout successfully',
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
