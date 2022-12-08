import express from 'express';
import { sequelize } from '../core/sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  const posts = sequelize.models.Post.findAll();
  return res.json({data: posts});
});

export default router;
