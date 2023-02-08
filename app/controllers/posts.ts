import express from 'express';
import createError from 'http-errors';
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
import { config } from '../config';
import { MODELS } from '../constants/DBNames';
import { getFilePostModel } from '../models/FilePost';
import { FilePostModelInput } from '../types/models/IFilePostModel';

const router = express.Router();

router.get('/',
  validate(GetPostSchema, 'params'),
  async (req, res) => {
    const params = req.params as unknown as GetPostType;
    const limit = params.size ?? 10;
    const offset = params.page ? (params.page-1) * limit : 0;

    const posts = await getPostModel(sequelize).findAll({
      include: [MODELS.User.tableName.singular, MODELS.FilePost.tableName.plural],
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
  upload.array('files'),
  validate(CreatePostSchema, 'body'),
  async (req: TypedRequest<CreatePostType>, res, next) => {
    const message = req.body.message ?? null;
    const files = req.files ?? null;
    if (!message && (!files || files.length === 0)) {
      return next(createError.BadRequest('You need to send a message or a file'));
    }

    const data: PostModelInput = {
      message,
    };

    const user = await getUserFromToken(req.header('Token-Auth'));
    if (user) {
      data.userId = user.getDataValue('id');
    }

    const newPost = await getPostModel(sequelize).create(data);
    const postDTO: any = {
      ...newPost.dataValues,
      filePosts: null,
    };

    if (files) {
      const postId = newPost.getDataValue('id');
      const newFilePosts: FilePostModelInput[] = (files as Express.Multer.File[]).map(file => ({
        postId,
        name: file.originalname,
        path: config.BACKEND_DOMAIN +  '/public/' + file.filename,
        mimeType: file.mimetype,
        size: file.size,
      }));
      const createdFilePosts = await getFilePostModel(sequelize).bulkCreate(newFilePosts);
      postDTO.filePosts = createdFilePosts.map(createdFilePost => createdFilePost.dataValues);
    }

    const resData = successResponseData({
      code: 201,
      message: 'Post created successfully',
      data: postDTO,
    });
    return res.status(resData.code).json(resData);
  }
);

export default router;
