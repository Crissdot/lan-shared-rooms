import express from 'express';
import { z } from 'zod';
import { sequelize } from '../core/sequelize';
import { getUserModel } from '../models/User';
import { UserModelInput } from '../types/models/IUserModel';
import { TypedRequest } from '../types/TypedRequest';
import { CreateUserSchema, CreateUserType } from '../schemas/users';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';

const router = express.Router();
const UserModel = getUserModel(sequelize);

router.get('/',
  async (req, res) => {
    const users = await UserModel.findAll();

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
    const newUser = await UserModel.create(data);

    const resData = successResponseData({
      code: 201,
      message: 'User created successfully',
      data: newUser,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
