import express from 'express';
import { sequelize } from '../core/sequelize';
import { PostSchema } from '../schemas/post';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';

const router = express.Router();

router.get('/',
  async (req, res) => {
    const posts = await sequelize.models.Post.findAll();

    const resData = successResponseData({
      message: 'Get all posts',
      data: posts,
    });
    return res.json(resData);
  }
);

router.post('/',
  validate(PostSchema, 'body'),
  async (req, res) => {
    const newPost = await sequelize.models.Post.create(req.body);

    const resData = successResponseData({
      code: 201,
      message: 'Post created successfully',
      data: newPost,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
