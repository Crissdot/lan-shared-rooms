import express from 'express';
import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';
import { UserModelInput } from '../types/models/IUserModel';
import { TypedRequest } from '../types/TypedRequest';
import { CreateUserSchema, CreateUserType } from '../schemas/users';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';
import { tokenBasedAuth } from '../middlewares/authHandler';

const router = express.Router();

router.get('/',
  tokenBasedAuth,
  async (req, res) => {
    const users = await getUserModel(sequelize).findAll();

    const resData = successResponseData({
      message: 'Get all users',
      data: users,
    });
    return res.json(resData);
  }
);

router.post('/',
  validate(CreateUserSchema, 'body'),
  async (req: TypedRequest<CreateUserType>, res) => {
    const data: UserModelInput = {
      username: req.body.username,
      rawPassword: req.body.password
    };
    const newUser = await getUserModel(sequelize).create(data);

    const resData = successResponseData({
      code: 201,
      message: 'User created successfully',
      data: newUser,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
