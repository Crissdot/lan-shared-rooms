import express from 'express';
import { sequelize } from '../core/sequelize';
import { validate } from '../middlewares/validatorHandler';
import { PostSchema } from '../schemas/post';

const router = express.Router();

router.get('/',
  async (req, res) => {
    const posts = await sequelize.models.Post.findAll();
    return res.json({data: posts});
  }
);

router.post('/',
  validate(PostSchema, 'body'),
  async (req, res) => {
    const newPost = await sequelize.models.Post.create(req.body);
    return res.status(201).json({data: newPost});
  }
);

export default router;
