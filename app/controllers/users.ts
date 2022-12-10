import express from 'express';
import { sequelize } from '../core/sequelize';
import { CreateUserSchema } from '../schemas/users';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';

const router = express.Router();

router.get('/',
  async (req, res) => {
    const users = await sequelize.models.User.findAll();

    const resData = successResponseData({
      message: 'Get all users',
      data: users,
    });
    return res.json(resData);
  }
);

router.post('/',
  validate(CreateUserSchema, 'body'),
  async (req, res) => {
    const newUser = await sequelize.models.User.create(req.body);

    const resData = successResponseData({
      code: 201,
      message: 'User created successfully',
      data: newUser,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
