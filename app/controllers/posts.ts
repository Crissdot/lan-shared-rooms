import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({message: 'Hola mundo'});
});

export default router;
