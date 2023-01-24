import express from 'express';
import { sequelize } from '../core/sequelize';
import { getPostModel } from '../models/Post';
import { PostModelInput } from '../types/models/IPostModel';
import { TypedRequest } from '../types/TypedRequest';
import { GetPostSchema, GetPostType, CreatePostSchema, CreatePostType } from '../schemas/post';
import { optionalLogin } from '../middlewares/authHandler';
import { validate } from '../middlewares/validatorHandler';
import { successResponseData } from '../middlewares/responseHandler';
import { getUserFromToken } from '../utils/tokenValidator';
import { upload } from '../middlewares/uploadFileHandler';

const router = express.Router();

router.get('/',
  validate(GetPostSchema, 'params'),
  async (req, res) => {
    const params = req.params as unknown as GetPostType;
    const limit = params.size ?? 10;
    const offset = params.page ? (params.page-1) * limit : 0;

    const posts = await getPostModel(sequelize).findAll({
      include: 'user',
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const resData = successResponseData({
      message: 'Get all posts',
      data: posts,
    });
    return res.json(resData);
  }
);

router.post('/',
  optionalLogin,
  upload.single('file'),
  validate(CreatePostSchema, 'body'),
  async (req: TypedRequest<CreatePostType>, res) => {
    const data: PostModelInput = {
      message: req.body.message ?? req.file?.path ?? '',
    };

    const user = await getUserFromToken(req.header('Token-Auth'));
    if (user) {
      data.userId = user.getDataValue('id');
    }

    const newPost = await getPostModel(sequelize).create(data);

    const resData = successResponseData({
      code: 201,
      message: 'Post created successfully',
      data: newPost,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
