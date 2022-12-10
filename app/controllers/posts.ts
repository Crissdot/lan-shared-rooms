import express from 'express';
import { sequelize } from '../core/sequelize';
import { getPostModel } from '../models/Post';
import { PostModelInput } from '../types/models/IPostModel';
import { TypedRequest } from '../types/TypedRequest';
import { CreatePostSchema, CreatePostType } from '../schemas/post';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';

const router = express.Router();
const PostModel = getPostModel(sequelize);

router.get('/',
  async (req, res) => {
    const posts = await PostModel.findAll();

    const resData = successResponseData({
      message: 'Get all posts',
      data: posts,
    });
    return res.json(resData);
  }
);

router.post('/',
  validate(CreatePostSchema, 'body'),
  async (req: TypedRequest<CreatePostType>, res) => {
    const newPost = await PostModel.create(req.body as PostModelInput);

    const resData = successResponseData({
      code: 201,
      message: 'Post created successfully',
      data: newPost,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
