import { Router } from 'express';
import { apiRouter } from './api.routes';
import { resolve } from 'path';

const router = Router();
router.use('/api', apiRouter);
router.get('/profesor', (req, res) => {
  res.sendFile(resolve(__dirname, '..', '..', 'builded-client', 'teacher', 'index.html'));
});

export const rootRouter = router;